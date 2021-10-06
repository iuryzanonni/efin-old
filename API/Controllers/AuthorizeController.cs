using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.DTOs;
using API.Models;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthorizeController : ControllerBase
	{
		private readonly ApplicationDBContext _contextEF;
		private readonly IMapper _mapper;

		public AuthorizeController(ApplicationDBContext context, IMapper mapper)
		{
			_contextEF = context;
			_mapper = mapper;
		}

		[HttpPost]
		[Route("login")]
		[AllowAnonymous]
		public async Task<ActionResult<dynamic>> Authenticate([FromBody]User p_user)
		{
			User user = _contextEF.User.Where(u => u.username == p_user.username).FirstOrDefault();
			if (user == null)
				return NotFound(new { message = "Invalid username or password." });

			if (p_user.username is null) 
				return NotFound(new { message = "The username cannot be empty." });

			if (p_user.password is null)
				return NotFound(new { message = "Enter the password." });

			if (!user.UserAuthenticated(p_user))
				return NotFound(new { message = "Invalid password." });

			var userDTO = _mapper.Map<UserDTO>(user);
			var token = TokenService.GenerateToken(user);
			user.password = "";
			return new { user = userDTO, token = token };
		}
	}
}
