using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsPostRequirement : IAuthorizationRequirement
    {

    }

    public class IsPostRequirementHandler : AuthorizationHandler<IsPostRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsPostRequirementHandler(DataContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsPostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var postId = Guid.Parse(_httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var post = _dbContext.Posts
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.Id == postId)
                .Result;

            if (post == null) return Task.CompletedTask;

            if (post.AuthorId == userId) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}