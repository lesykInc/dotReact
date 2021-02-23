using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {   
        // I'm not actually going to return an activity entity from this command
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }
        
            public string Description { get; set; }
        
            public string Category { get; set; }
        
            public DateTime Date{ get; set; }
        
            public string City { get; set; }
        
            public string Venue { get; set; }
        }
        
        public class CommandValidator: AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            // in this case Unit like an empty object
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };
                
                //add activity to this context
                _context.Activities.Add(activity);
                
                // if SaveChanges = 0 then nothing's been saved to db
                var success = await _context.SaveChangesAsync() > 0;
                if(success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}