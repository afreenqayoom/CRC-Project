import React from 'react';
// import Tablewidget from '../Widgets/Tablewidget';
import axios from '../../axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
export default function ViewReciept() {
    // const theading=["Dated","Reciept_ID","Registration_ID","Charges"];
    const [totalcharges, settotal] = useState(0);
    const [tabledata, settabledata] = useState([]);
    // const tabledata=[
    //   {"RegID":"01010009","Date":"01-Jan-2021","Clinical Services":"PhysioTherapy","Amount":"50"},
    //   {"RegID":"01010010","Date":"02-Jan-2021","Clinical Services":"Occupational Therapy","Amount":"20"}
    // ]
    const { REACT_APP_URL } = process.env;
    const getdetails = () => {
        let amt = 0;
        axios.post("getpayment", {
            DATEFROM: formik.values.datefrom,
            DATETO: formik.values.dateto
        }).then((response) => {
            settabledata(response.data);
            response.data.forEach(el => {
                amt = amt + el.Charges;
            })
            settotal(amt);
            amt = 0;
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-center", autoClose: 2000
            });
        })
    }
    const initialValues = {
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
    const columns = [

        // { accessorKey: 'Sno', header: 'SNo.',size:50},
        { accessorKey: 'Dated', header: 'Dated', size: 50 },
        { accessorKey: 'Reciept_ID', header: 'Reciept ID', size: 50 },
        { accessorKey: 'Registration_ID', header: 'Registration ID', size: 50 },
        { accessorKey: 'Charges', header: 'Charges', size: 50 },

    ]

   
    return (
        <div className="input-boxes">
            <form id="payment" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-20"><label>Date From</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="datefrom" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}><label >Date To</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="dateto" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}> <button type="submit" form="payment" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div>
                </div>
                {/* <div className="row" style={{paddingTop:"60px",paddingBottom:"60px"}}>
            <Tablewidget tname="Payment Details" data={tabledata} theading={theading} color='#7d2ae8'/>
        
            </div> */}
                <div className="row" style={{justifyContent:"center",alignItems:"center"}}>

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
                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Account Reciept Register", process.env.REACT_APP_COMPANY_NAME)

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

                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Account Reciept Register", process.env.REACT_APP_COMPANY_NAME, "A3")

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
                                        ExportCsv((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Account Reciept Register")

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
                        <label style={{ float: "right", padding: "10px" }}>Total Amount</label>
                    </div>
                    <div className="col-20">
                        <input type="text" disabled className="input-com" value={totalcharges} style={{ textAlign: "right", fontSize: "20px" }} />
                    </div>


                </div>
            </form>
        </div>
    );
}