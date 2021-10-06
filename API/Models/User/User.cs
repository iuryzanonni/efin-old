﻿using API.Interfaces;
using API.Services;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User : IUser
    {
        public int id { get; set; }
        [MaxLength(20)] public string username { get; set; }
        [MaxLength(200)] public string name { get; set; }
        public string password { get; set; }
        [MaxLength(100)] public string email { get; set; }
        [MaxLength(20)] public string role { get; set; }

        public bool UserAuthenticated(User p_userLogin)
		{
            p_userLogin.password = PasswordService.EncryptPassword(p_userLogin.password);

            if(PasswordService.DecryptString(this.password) == PasswordService.DecryptString(p_userLogin.password))
			{
                return true;
			}

            return false;
		}

    }
}
