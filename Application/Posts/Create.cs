using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public partial class Create
    {   
        // I'm not actually going to return an activity entity from this command
        public partial class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }
        
            public string Body { get; set; }

            public DateTime CreatedDate{ get; set; }
            
            public DateTime LastUpdatedDate{ get; set; }

        }
        
        public partial class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            // in this case Unit like an empty object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var post = new Post()
                {
                    Id = request.Id,
                    Title = request.Title,
                    Body = request.Body,
                    CreatedDate = request.CreatedDate,
                    LastUpdatedDate = request.CreatedDate
                };
                
                //add activity to this context
                _context.Posts.Add(post);
                
                // if SaveChanges = 0 then nothing's been saved to db
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}