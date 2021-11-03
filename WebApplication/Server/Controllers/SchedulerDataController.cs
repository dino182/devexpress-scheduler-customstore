using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using DevExtreme.AspNet.Data.ResponseModel;

namespace WebApplication.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchedulerDataController : ControllerBase
    {
        private readonly List<Appointment> _appointments = new()
        {
            new Appointment
            {
                AppointmentId = 1,
                Text = "Item 1",
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1)
            },
            new Appointment
            {
                AppointmentId = 2,
                Text = "Item 2",
                StartDate = DateTime.Now.AddDays(1),
                EndDate = DateTime.Now.AddDays(2)
            }
        };

        [HttpGet]
        public LoadResult Get(DataSourceLoadOptions loadOptions)
        {
            return DataSourceLoader.Load(_appointments.AsQueryable(), loadOptions);
        }
    }
}
