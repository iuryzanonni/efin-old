using System;
using System.ComponentModel.DataAnnotations;


namespace API.Models.TimeWork
{
	public class TimeWork
	{
		[Key]
		public DateTime DateDay { get; set; }
		public DateTime StartDay { get; set; }
		public DateTime StopLunch { get; set; }
		public DateTime BackLunch { get; set; }
		public DateTime EndDay { get; set; }

		public User User { get; set; }
	}
}
