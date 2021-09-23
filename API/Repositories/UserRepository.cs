using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Repositories
{
    public static class UserRepository
    {
        public static User Get(string username, string password)
        {
            var users = new List<User>();
            users.Add(new User { id = 1, username = "batman", password = "batman", role = "manager" });
            users.Add(new User { id = 2, username = "robin", password = "robin", role = "employee" });

            return users.Where(x => x.username.ToLower() == username && x.password.ToLower() == password).FirstOrDefault();

        }
    }
}
