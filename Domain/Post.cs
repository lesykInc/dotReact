using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public ICollection<PostAttendee> AttendeesPost { get; set; } = new List<PostAttendee>();
    }
}