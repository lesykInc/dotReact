using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Posts;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListPosts
    {
        public class Query : IRequest<Result<List<PostDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PostDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // EF dependence
            public async Task<Result<List<PostDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Users
                    // .Where(u => u.AppUser.UserName == request.Username)
                    .Where(u => u.Id == request.Username)
                    .OrderBy(a => a.Posts)
                    .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                // query = request.Predicate switch
                // {
                //     "past" => query.Where(a => a.Date <= DateTime.Now),
                //     "hosting" => query.Where(a => a.AuthorUsername == request.Username),
                //     _ => query.Where(a => a.Date >= DateTime.Now)
                // };

                var posts = await query.ToListAsync();

                return Result<List<PostDto>>.Success(posts);
            }
        }
    }
}