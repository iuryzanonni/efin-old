using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthorizeTesteController : ControllerBase
	{
		//private readonly UserManager<IdentityUser> _userManager;
		//private readonly SignInManager<IdentityUser> _signInManager;

		//public AuthorizeTesteController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
		//{
		//	_userManager = userManager;
		//	_signInManager = signInManager;
		//}

		//[HttpGet]
		//public ActionResult<string> Get()
		//{
		//	return "AutorizaController :: Acessado em :" + DateTime.Now.ToLongDateString();
		//}

		//[HttpPost("register")]
		//public async Task<ActionResult> ResisterUser([FromBody]UserDTO model)
		//{
		//	var user = new IdentityUser
		//	{
		//		UserName = model.username,
		//		Email = model.email,
		//		EmailConfirmed = true
		//	};

		//	var result = await _userManager.CreateAsync(user, model.password);

		//	if (!result.Succeeded)
		//		return BadRequest(result.Errors);

		//	await _signInManager.SignInAsync(user, false);
		//	return Ok();
		//}

		//[HttpPost("login")]
		//public async Task<ActionResult> Login([FromBody] UserDTO userInfo)
		//{
		//	var result = await _signInManager.PasswordSignInAsync(userInfo.username, userInfo.password, isPersistent: false, lockoutOnFailure: false);
		//	var result;

		//	if (result.Succeeded)
		//	{
		//		return Ok();
		//	}
		//	else
		//	{
		//		ModelState.AddModelError(string.Empty, "Login Inválido.");
		//		return BadRequest(ModelState);
		//	}
		//}

	}
}
