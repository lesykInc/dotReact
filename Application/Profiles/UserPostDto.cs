﻿using System;
using System.Text.Json.Serialization;

namespace Application.Profiles
{
    public class UserPostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }

        [JsonIgnore]
        public string AuthorUsername { get; set; }
    }
}