using System;

namespace Application.Core
{
    public class PostParams
    {
        public bool IsAuthor { get; set; }
        public DateTime StartDate { get; set; } = DateTime.UtcNow;

    }
}