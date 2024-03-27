type Employee = {
  id: number,
  name: string,
  retire: () => void
}

let newEmployee: Employee = {
  id: 2,
  name: "miad",
  retire() {
    console.log(this.id)
  },
}

newEmployee.retire()