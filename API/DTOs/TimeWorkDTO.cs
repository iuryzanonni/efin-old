using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
	public class TimeWorkDTO
	{
		public DateTime DateDay { get; set; }
		public DateTime StartDay { get; set; }
		public DateTime StopLunch { get; set; }
		public DateTime BackLunch { get; set; }
		public DateTime EndDay { get; set; }

	}
}
