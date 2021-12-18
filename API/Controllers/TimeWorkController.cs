using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.DTOs;
using API.Models;
using API.Models.TimeWork;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TimeWorkController : ControllerBase
	{
		private readonly ApplicationDBContext _contextEF;
		private readonly IMapper _mapper;
		public TimeWorkController(ApplicationDBContext context, IMapper mapper)
		{
			_mapper = mapper;
			_contextEF = context;
		}

		[HttpGet]
		[Route("")]
		[AllowAnonymous]
		public ActionResult<IEnumerable<TimeWork>> GetMonthTimes()
		{
			var results = _contextEF.TimeWork.Where(t => t.DateDay.Month == 12 && t.User.id == 4).ToList();
			return results;
		}
		
		[HttpGet]
		[Route("getTimeWork", Name = "getTimeWork")]
		[Authorize(Roles = "owner,manage,user")]
		public ActionResult<TimeWorkDTO> GetTimeWork([FromBody]string dateDay)
		{
			string username = User.Identity.Name;
			User user = new User(_contextEF);
			user = user.GetUserWhitName(username);
			DateTime date = DateTime.Parse(dateDay, CultureInfo.CreateSpecificCulture("pt-BR"));

			TimeWork timeWork = _contextEF.TimeWork.FirstOrDefault(tw => tw.DateDay == date && tw.User.id == user.id);
			TimeWorkDTO timeWorkDTO = _mapper.Map<TimeWorkDTO>(timeWork);

			return timeWorkDTO;
		}


		[HttpPost]
		[Route("insertDate")]
		[Authorize(Roles = "owner,manage,user")]
		public ActionResult CreateDate([FromBody]string dateDay)
		{
			string username = User.Identity.Name;
			User user = new User(_contextEF);
			user = user.GetUserWhitName(username);
			DateTime date = DateTime.Parse(dateDay, CultureInfo.CreateSpecificCulture("pt-BR"));

			TimeWork timeWork = new TimeWork(date, user);
			_contextEF.TimeWork.Add(timeWork);
			_contextEF.SaveChanges();
			TimeWorkDTO timeWorkDTO = _mapper.Map<TimeWorkDTO>(timeWork);

			return Created("Day Successfully Saved.", timeWorkDTO);
		}
	}
}
