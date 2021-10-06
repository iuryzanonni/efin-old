using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly ApplicationDBContext _contextEF;

		public UserController(ApplicationDBContext context)
		{
			_contextEF = context;
		}

		[HttpGet]
		[Route("{id}", Name = "GetUser")]
		[Authorize(Roles = "owner,manager")]
		public ActionResult<User> GetUser(int id)
		{
			var user = _contextEF.User.AsNoTracking().FirstOrDefault(u => u.id == id);
			if (user == null)
			{
				return NotFound();
			}
			user.password = "";
			return user;
		}

		[HttpPost]
		[Route("createuser")]
		[AllowAnonymous]
		public ActionResult CreateUser([FromBody]User user)
		{
			user.password = PasswordService.EncryptPassword(user.password);
			_contextEF.User.Add(user);
			_contextEF.SaveChanges();
			return new CreatedAtRouteResult("GetUser", new { id = user.id }, user);
		}
	}
}
