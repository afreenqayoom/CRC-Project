import React from 'react';
import Tablewidget from '../Widgets/Tablewidget';
import axios from '../../axios';
import { useState } from 'react';
import { useFormik } from 'formik';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { toast } from 'react-toastify';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function PatientReport() {
    // const theading=["Sno","Registration_ID","Dated","Patient_Name","Parentage","Address","Phone_Number","Gender","Age","Department","Category"];
    // const [totalcharges, settotal] = useState(0);
    const [tabledata, settabledata] = useState([]);
    const [totalRegfee, settotal] = useState(0);
    const getdetails = () => {
        let amt=0;
        axios.post("patientreport", {
            DATEFROM: formik.values.datefrom,
            DATETO: formik.values.dateto,
            //    PTYPE:formik.values.ptype
        }).then((response) => {
            settabledata(response.data);
            response.data.forEach(el => {
                amt = amt + el.Registration_Fee;
            })
            settotal(amt);
            amt = 0;

        }).catch((error) => {
            if (error.response) {
                toast.error(error.response.data["message"], {
                    position: "top-center", autoClose: 2000
                });
            }

            else {
                toast.error(error.message, {
                    position: "top-center", autoClose: 2000
                });

            }

        })
    }
    const initialValues = {
        datefrom: '',
        dateto: ''
        // ptype:'New Patient'
    }
    const onSubmit = (values) => {
        // console.log("fv", values);
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    });
    const columns = [

        // { accessorKey: 'Sno', header: 'SNo.',size:50},
        { accessorKey: 'Dated', header: 'Dated', size: 50 },
        { accessorKey: 'Registration_ID', header: 'Registration ID', size: 50 },
        {
            accessorKey: 'Patient_Type', header: 'Patient Type', size: 50, filterVariant: 'select',
            filterSelectOptions: ["New Patient", "Follow Up"]
        },
        { accessorKey: 'Patient_Name', header: 'Name', size: 50 },
        { accessorKey: 'Age', header: 'Age', type: 'numeric', size: 50 },
        {
            accessorKey: 'Gender', header: 'Gender', size: 50, filterVariant: 'select',
            filterSelectOptions: ["Male", "Female"]
        },
        { accessorKey: 'Address', header: 'Address', size: 50 },
        { accessorKey: 'Phone_Number', header: 'Phone Number', size: 50 },
        {
            accessorKey: 'Category', header: 'Category', size: 50

        },
        { accessorKey: 'Department', header: 'Department', size: 50 },
        { accessorKey: 'Registration_Fee', header: 'Registration Fee', size: 50 },

    ]

    // const materialcorecolumns = [

    //     // { title: '#', field: 'Sno',filtering: false },
    //     { title: 'Dated', field: 'Dated', filtering: false, minWidth: "150px" },
    //     { title: 'Registration ID', field: 'Registration_ID' },
    //     {
    //         title: 'Patient Type', field: 'Patient_Type', lookup: {
    //             "New Patient": "New Patient",
    //             "Follow Up": "Follow Up",
    //         },
    //     },
    //     { title: 'Name', field: 'Patient_Name' },
    //     { title: 'Age', field: 'Age', type: 'numeric', filtering: false },
    //     { title: 'Gender', field: 'Gender' },
    //     { title: 'Address', field: 'Address', filtering: false },
    //     { title: 'Contact No', field: 'Phone_Number' },
    //     { title: 'Category', field: 'Category' },
    //     { title: 'Department', field: 'Department', filtering: false },

    // ]
    return (
        <div className="input-boxes">
            <form id="patientreport" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-20"><label>Date From</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="datefrom" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}><label >Date To</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="dateto" onChange={formik.handleChange} /></div>

                    <div className="col-20" style={{ textAlign: "center" }}> <button type="submit" form="patientreport" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div>
                </div>
                <div className="row" style={{ justifyContent: "center", alignItems: "center" }}>

                    <MaterialReactTable
                        columns={columns}
                        data={tabledata}
                        enableRowNumbers
                        rowNumberMode="static" //default 
                        renderTopToolbarCustomActions={({ table }) => (
                            <Box
                                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                            >

                                {/* {console.log("filtered",table.getPrePaginationRowModel().rows.map((row) => row))} */}
                                <Button
                                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //export all rows, including from the next page, (still respects filtering and sorting)
                                    onClick={() =>
                                        //   handleExportRows(table.getPrePaginationRowModel().rows)
                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Patient Register", process.env.REACT_APP_COMPANY_NAME)
                                        //  ExportPdf(materialcorecolumns, table.getPrePaginationRowModel().rows.map((row) => row.original), "Patient Register")

                                    }
                                    startIcon={<FileDownloadIcon />}
                                    variant="contained"
                                >
                                    Export Pdf on A4
      </Button>
                                <Button
                                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //export all rows, including from the next page, (still respects filtering and sorting)
                                    onClick={() =>
                                        //   handleExportRows(table.getPrePaginationRowModel().rows)

                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Patient Register", process.env.REACT_APP_COMPANY_NAME, "A3")

                                    }
                                    startIcon={<FileDownloadIcon />}
                                    variant="contained"
                                >
                                    Export Pdf on A3
                      </Button>
                                <Button
                                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //export all rows, including from the next page, (still respects filtering and sorting)
                                    onClick={() =>
                                        //   handleExportRows(table.getPrePaginationRowModel().rows)
                                        ExportCsv((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Patient Register")

                                    }
                                    startIcon={<FileDownloadIcon />}
                                    variant="contained"
                                >
                                    Export Csv File
                      </Button>

                            </Box>
                        )}
                    />


                </div>
                <div className="row">
                    <div className="col-80" >
                        <label style={{ float: "right", padding: "10px" }}>Total Registration Fee</label>
                    </div>
                    <div className="col-20">
                        <input type="text" disabled className="input-com" value={totalRegfee} style={{ textAlign: "right", fontSize: "20px" }} />
                    </div>


                </div>
            </form>

        </div>
    );
}