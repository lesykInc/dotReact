using System;
using Domain;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public string AuthorUsername { get; set; }
        public bool IsAuthor { get; set; }
        public string AuthorId { get; set; }
        public AppUser Author { get; set; }
    }
}