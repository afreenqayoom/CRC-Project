const initialState = {
  regId: "",
  regDate: '',
  pname: '',
  parentage: '',
  category: 'General',
  address: '',
  district: '',
  age: '',
  gender: 'Male',
  phno: '',
  qualification: 'None',
  religion: 'None',
  caste: 'None',
  martial: 'None',
  martialchange: 'None',
  occupation: 'None',
  occupationchange: 'None',
  familyoccupation: 'None',
  income: 'None',
  incomechange: 'None',
  disabilitycause: 'None',
  disabilitytype: 'None',
  familydisabled: 'No',
  totalfamily: '',
  totaldisabled: '',
  disability: [],
  disabilityParts: [],
  rehab: [],
  recieptDate: '',
  recieptId: '',
  tabledata: []
};

function addReducer(state = initialState, action) {

  switch (action.type) {
    case 'SUBMIT':
      return {
        regId: action.payload.regId,
        regDate: action.payload.regDate,
        pname: action.payload.pname,
        parentage: action.payload.parentage,
        category: action.payload.category,
        address: action.payload.address,
        district: action.payload.district,
        age: action.payload.age,
        gender: action.payload.gender,
        phno: action.payload.phno,
        qualification: action.payload.qualification,
        religion: action.payload.religion,
        caste: action.payload.caste,
        martial: action.payload.martial,
        martialchange: action.payload.martialchange,
        occupation: action.payload.occupation,
        occupationchange: action.payload.occupationchange,
        familyoccupation: action.payload.familyoccupation,
        income: action.payload.income,
        incomechange: action.payload.incomechange,
        disabilitycause: action.payload.disabilitycause,
        disabilitytype: action.payload.disabilitytype,
        familydisabled: action.payload.familydisabled,
        totalfamily: action.payload.totalfamily,
        totaldisabled: action.payload.totaldisabled,
        disability: action.payload.disability,
        disabilityParts: action.payload.disabilityParts,
        rehab: action.payload.rehab,
        recieptDate: action.payload.recieptDate,
        recieptId: action.payload.recieptId,
        tabledata:action.payload.tabledata,
        totalamount:action.payload.totalamount

      }
    default:
      return state;
  }
}

export default addReducer;