using API.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User : IUser
    {
        public int id { get; set; }
        [MaxLength(20)] [Required] public string username { get; set; }
        [MaxLength(200)] [Required] public string name { get; set; }
        [Required] public string password { get; set; }
        [Required] [MaxLength(100)] public string email { get; set; }
        [Required] [MaxLength(20)] public string role { get; set; }

    }
}
