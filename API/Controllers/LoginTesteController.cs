using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using API.Models;
using API.Repositories;
using API.Services;

namespace API.Controllers
{
    [Route("account/[controller]")]
    [ApiController]
    public class LoginTesteController : ControllerBase
    {
        [HttpPost]
        //[Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody]User p_user=null)
        {
			var user = UserRepository.Get(p_user.username, p_user.password);

            if (user == null)
                return NotFound(new { message = "Usuario ou senha inválidos." });

            var token = TokenService.GenerateToken(user);
            user.password = "";
            return new { user = user, token = token };
        }

        [HttpGet]
        [Route("anonymous")]
        [AllowAnonymous]
        public string Anonymous() => "Anônimo";

        [HttpGet]
        [Route("authenticated")]
        [Authorize]
        public string Authenticated()
		{
            return String.Format("Autenticado = {0}", User.Identity.Name);
		}

        [HttpGet]
        [Route("employee")]
        [Authorize(Roles = "employee, manager")]
        public string Employee() => String.Format("Credetial --> {0}", User.Identity.Name);

        [HttpGet]
        [Route("manager")]
        [Authorize(Roles = "manager")]
        public string Manager() => "Gerente";
    }
}
