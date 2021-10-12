using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
	public static class CookieService
	{
		public static CookieOptions CreateOptionsCookie()
		{
			CookieOptions options = new CookieOptions();
			options.Expires = DateTime.Now.AddHours(10);
			options.Domain = "localhost:3000";
			options.HttpOnly = false;

			return options;		
		}
	}
}
