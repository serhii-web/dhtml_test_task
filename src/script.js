import { columns as gridColumns } from "../assets/columns.js";

const filterFormConfig = {
  padding: "8px 12px 0",
  cols: [
    {
      type: "input",
      name: "groupId",
      label: "GroupId",
      padding: "8px",
      placeholder: "Type something",
    },
    {
      type: "combo",
      width: 270,
      name: "name",
      label: "Name",
      padding: "8px",
      itemHeight: 50,
      placeholder: "Select something",
    },
    {
      type: "datepicker",
      name: "creationDate",
      label: "CreationDate",
      dateFormat: "%d/%m/%Y",
      padding: "8px",
      placeholder: "Select date",
      editable: true,
    },
    {
      padding: "32px 8px 0",
      cols: [
        {
          name: "search-button",
          type: "button",
          icon: "mdi mdi-magnify",
          text: "Search",
          circle: true,
        },
        {
          name: "clear",
          type: "button",
          text: "clear",
          view: "link",
          padding: "0 16px",
          circle: true,
        },
      ],
    },
  ],
};

const layout = new dhx.Layout("layout", {
  rows: [
    {
      id: "filter",
      height: "content",
      css: "dhx_demo-filter",
    },
    {
      type: "space",
      rows: [{ id: "grid" }],
    },
  ],
});

const filterForm = new dhx.Form(null, filterFormConfig);

filterForm.getItem("search-button").events.on("click", () => {
  const filterData = filterForm.getValue();

  grid.data.filter((item) => {
    for (const key in filterData) {
      if (filterData[key] && !RegExp(filterData[key], "i").exec(item[key])) {
        return false;
      }
    }

    return true;
  });
});

filterForm.getItem("clear").events.on("click", () => {
  filterForm.clear();
  grid.data.filter();
});

const grid = new dhx.Grid(null, {
  css: "dhx_demo-grid",
  columns: gridColumns,
  adjust: true,
  autoWidth: true,
  editable: true,
});

grid.data.load("../assets/data.json").then((data) => {
  const names = [...new Set(data.map((item) => item.name))];
  filterForm
    .getItem("name")
    .getWidget()
    .data.add(names.map((item) => ({ id: item, value: item })));
});

layout.getCell("filter").attach(filterForm);
layout.getCell("grid").attach(grid);
