using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Search
    {
        public class Query : IRequest<Result<List<PostDto>>>
        {
            public string Search { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PostDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<List<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Posts
                    .Where(p => p.Content.Contains(request.Search)|| p.Title.Contains(request.Search))
                    .OrderByDescending(d => d.Date)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider,
                        new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                return Result<List<PostDto>>.Success(
                    await query.ToListAsync(cancellationToken)
                );
            }
        }
    }
}