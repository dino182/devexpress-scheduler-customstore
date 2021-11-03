export function create(schedulerElement, dotNetScheduler, currentDate, loadData) {
    const store = new DevExpress.data.CustomStore({
        key: "id",
        load: options => {
            return dotNetScheduler.invokeMethodAsync(loadData, convertToDotNet(options));
        }
    });

    const scheduler = new DevExpress.ui.dxScheduler(schedulerElement, ({
        timeZone: "Europe/London",
        dataSource: {
            store: store
        },
        remoteFiltering: true,
        views: [
            {
                type: "day",
                groupOrientation: "vertical",
                maxAppointmentsPerCell: "auto"
            },
            {
                type: "workWeek",
                groupOrientation: "vertical",
                maxAppointmentsPerCell: "auto"
            },
            {
                type: "month",
                groupOrientation: "vertical",
                maxAppointmentsPerCell: 3
            },
            {
                type: "timelineMonth",
                groupOrientation: "vertical",
                maxAppointmentsPerCell: "3"
            }
        ],
        editing: {
            allowAdding: false
        },
        currentView: "month",
        currentDate: currentDate,
        firstDayOfWeek: 1,
        startDayHour: 9,
        endDayHour: 17
    }));
    return scheduler;
}

export function dispose(scheduler) {
    scheduler.dispose();
}

function convertToDotNet(options) {
    return {
        Filter: options.filter,
        Group: options.group,
        GroupSummary: options.groupSummary,
        RequireGroupCount: options.requireGroupCount,
        RequireTotalCount: options.requireTotalCount,
        Select: options.select,
        Skip: options.skip,
        Sort: options.sort,
        Take: options.take,
        TotalSummary: options.totalSummary
    };
}
