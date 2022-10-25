import React from 'react';
// import Tablewidget from '../Widgets/Tablewidget';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import axios from '../../axios';
import { useState } from 'react';
import { useFormik } from 'formik';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { toast } from 'react-toastify';

import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ViewReciept() {

    const theading = ["Sno", "Registration_ID", "Dated", "Patient_Name", "Parentage", "Address", "Phone_Number", "Gender", "Age", "Department", "Category"];
    // const [totalcharges, settotal] = useState(0);
    const [tabledata, settabledata] = useState([]);

    const getdetails = () => {
        // let amt=0;
        axios.post("physioregister/physiotherapyreport", {
            DATEFROM: formik.values.datefrom,
            DATETO: formik.values.dateto

        }).then((response) => {
            settabledata(response.data);

            //     response.data.forEach(el => {
            //         amt=amt+el.Charges;
            //     })
            //     settotal(amt);
            //    amt=0;
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-center", autoClose: 2000
            });
            console.log(error);
        })
    }
    const initialValues = {
        // datefrom: new Date().toLocaleDateString(),
        datefrom: '',
        dateto: '',

    }
    const onSubmit = (values) => {
        console.log("fv", values);
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    });
    const [rowno, setrowno] = useState(1);
   
    const columns=[

        // { accessorKey: 'Sno', header: 'SNo.',size:50},
        { accessorKey: 'Dated', header: 'Dated',size:50},
        { accessorKey: 'Registration_Id', header: 'Registration ID',size:50 },
        {
            accessorKey: 'Ptype', header: 'Patient Type',size:50,filterVariant: 'select',
            filterSelectOptions:["New Patient","Follow Up"]
        },
        { accessorKey: 'Patient_Name', header: 'Name',size:50 },
        { accessorKey: 'Age', header: 'Age', type: 'numeric',size:50 },
        { accessorKey: 'Gender', header: 'Gender' ,size:50,filterVariant: 'select',
        filterSelectOptions: ["Male","Female"]},
        { accessorKey: 'Address', header: 'Address',size:50},
        { accessorKey: 'Phone_Number', header: 'Phone Number' ,size:50},
        {
            accessorKey: 'Condition_Type', header: 'Condition Type',size:50
        },
        { accessorKey: 'Clinical_Conditions', header: 'Provisional Diagnosis',size:50},
        { accessorKey: 'Treatments', header: 'Treatments',size:50},
        { accessorKey: 'Supportive_Services', header: 'Supportive Services',size:50},
    ]

    const materialcorecolumns=[
                               
        // { title: '#', field: 'Sno',filtering: false },
        { title: 'Dated', field: 'Dated',filtering: false ,minWidth:"150px"},
        { title: 'Registration ID', field: 'Registration_Id' },
        {title:'Patient Type',field:'Ptype',lookup: {
            "New Patient": "New Patient",
            "Follow Up": "Follow Up",
          },},
        { title: 'Name', field: 'Patient_Name'},
        { title: 'Age', field: 'Age', type: 'numeric',filtering: false},
        { title: 'Gender', field: 'Gender' },
        { title: 'Address', field: 'Address',filtering: false},
        { title: 'Contact No', field: 'Phone_Number'},
        { title: 'Condition Type', field: 'Condition_Type',lookup: {
           Orthopedic: "Orthopedic",
             Neurological:"Neurological"
          }},
        { title: 'Provisional Diagnosis', field: 'Clinical_Conditions',filtering: false},
        { title: 'Treatment', field: 'Treatments',filtering: false},
        { title: 'Supportive Services', field: 'Supportive_Services',filtering: false},
    ]
    return (
        <div>

            <form id="physioregister" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-20"><label>Date From</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="datefrom" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}><label >Date To</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="dateto" onChange={formik.handleChange} /></div>

                    <div className="col-20" style={{ textAlign: "center" }}> <button type="submit" form="physioregister" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div>
                </div>



            </form>
            <div className="row">
            
                <MaterialReactTable
                    columns={columns}
                    data={tabledata} 
                    enableRowNumbers
                    rowNumberMode="static" //default 
                    renderTopToolbarCustomActions={({ table }) => (
                        <Box
                          sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                        >
                          {/* <Button
                            color="primary"
                            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                            onClick={handleExportData}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                          >
                            Export All Data
                          </Button> */}
                          {console.log("filtered",table.getPrePaginationRowModel().rows.map((row) => row))}
                          <Button
                            disabled={table.getPrePaginationRowModel().rows.length === 0}
                            //export all rows, including from the next page, (still respects filtering and sorting)
                            onClick={() =>
                            //   handleExportRows(table.getPrePaginationRowModel().rows)
                            ExportPdf(materialcorecolumns, table.getPrePaginationRowModel().rows.map((row) => row.original), "Physiotherapy Register")
                            
                            }
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                          >
                            Export Pdf
                          </Button>
                          <Button
                            disabled={table.getPrePaginationRowModel().rows.length === 0}
                            //export all rows, including from the next page, (still respects filtering and sorting)
                            onClick={() =>
                            //   handleExportRows(table.getPrePaginationRowModel().rows)
                            ExportCsv(materialcorecolumns, table.getPrePaginationRowModel().rows.map((row) => row.original), "Physiotherapy Register")
                            
                            }
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                          >
                            Export Csv File
                          </Button>
                          {/* <Button
                            disabled={table.getRowModel().rows.length === 0}
                            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                            onClick={() => handleExportRows(table.getRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                          >
                            Export Page Rows
                          </Button>
                          <Button
                            disabled={
                              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                            }
                            //only export selected rows
                            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                            startIcon={<FileDownloadIcon />}
                            variant="contained"
                          >
                            Export Selected Rows
                          </Button> */}
                        </Box>
                      )}
                    />
                {/* <MaterialTable
                            title="Physiotherapy Register"
                            columns={[
                               
                                { title: 'SNo.', field: 'Sno',filtering: false },
                                { title: 'Dated', field: 'Dated',filtering: false ,minWidth:"150px"},
                                { title: 'Registration ID', field: 'Registration_Id' },
                                {title:'Patient Type',field:'Ptype',lookup: {
                                    "New Patient": "New Patient",
                                    "Follow Up": "Follow Up",
                                  },},
                                { title: 'Name', field: 'Patient_Name'},
                                { title: 'Age', field: 'Age', type: 'numeric',filtering: false},
                                { title: 'Gender', field: 'Gender' },
                                { title: 'Address', field: 'Address',filtering: false},
                                { title: 'Contact No', field: 'Phone_Number'},
                                { title: 'Condition Type', field: 'Condition_Type',lookup: {
                                   Orthopedic: "Orthopedic",
                                     Neurological:"Neurological"
                                  }},
                                { title: 'Provisional Diagnosis', field: 'Clinical_Conditions',filtering: false},
                                { title: 'Treatment', field: 'Treatments',filtering: false},
                                { title: 'Supportive Services', field: 'Supportive_Services',filtering: false},
                            ]}
                            data={tabledata}
                            options={{
                                rowStyle:{fontSize:13},
                                search: true,
                                filtering: true,
                                columnsButton: true,
                                
                                exportMenu: [
                                    {
                                      label: "Export  All PDF",
                                      //// You can do whatever you wish in this function. We provide the
                                      //// raw table columns and table data for you to modify, if needed.
                                    //   exportFunc: (cols, datas) => console.log({ cols, datas }),
                                       
                                      exportFunc: (cols, datas) => ExportPdf(cols, data, "Physiotherapy Register"),
                                     
                                     
                                    },
                                    {
                                      label: "Export CSV",
                                      exportFunc: (cols, datas) => ExportCsv(cols, datas, "Physiotherapy Register"),
                                    },
                                    {
                                        label: "Export  Filter PDF",
                                        //// You can do whatever you wish in this function. We provide the
                                        //// raw table columns and table data for you to modify, if needed.
                                      //   exportFunc: (cols, datas) => console.log({ cols, datas }),
                                     
                                        exportFunc: (cols, datas) => ExportPdf(cols, tabledata, "Physiotherapy Filtered Register"),
                                      },
                                  ],
                            }}
                        /> */}
                        
            </div>
        </div>
    );
}