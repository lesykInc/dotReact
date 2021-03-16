using System;
using Application.Core;

namespace Application.Posts
{
    public class PostParams : PagingParams
    {
        public bool IsAuthorType { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;
    }
}