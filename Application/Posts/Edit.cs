using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Posts
{
    public class Edit
    {
        // using MediatR
        // It's body of the properties that we want to allow user to edit
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Body { get; set; }
            public DateTime? CreatedDate { get; set; }
            public DateTime? LastUpdatedDate { get; set; }
          
            
        }
        
        // using Persistence
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            
            // using System.Threading.Tast and System.Threading
            //handler logic:
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // get activity from db
                var post = await _context.Posts.FindAsync(request.Id);    

                if (post == null)
                    throw new Exception("Could not find activity");
                //               if this null  ->  this executed
                post.Title = request.Title ?? post.Title;            
                post.Body = request.Body ?? post.Body;
                post.CreatedDate = request.CreatedDate ?? post.CreatedDate;            
                post.LastUpdatedDate = request.LastUpdatedDate ?? post.LastUpdatedDate;             

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                
                // using System
                throw new Exception("Problem saving changes");
            }
        }
    }
}