using System;
using Application.Core;

namespace Application.Posts
{
    public class PostParams : PagingParams
    {
        public bool IsAuthor { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

    }
}