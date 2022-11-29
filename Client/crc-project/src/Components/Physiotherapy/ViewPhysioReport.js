import React from 'react';
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import axios from '../../axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function ViewPhysioReport() {
    const [tabledata, settabledata] = useState([]);
    const getdetails = () => {
        axios.post("physioregister/physiotherapyreport", {
            DATEFROM: formik.values.datefrom,
            DATETO: formik.values.dateto

        }).then((response) => {
            settabledata(response.data);
        }).catch((error) => {
            if (error.response){
            toast.error(error.response.data["message"], {
                position: "top-center", autoClose: 2000
            });
        }
           
               
            else{
                toast.error(error.message, {
                    position: "top-center", autoClose: 2000
                });

            }
               

            //console.log(error);
        })
    }
    const initialValues = {
        datefrom: '',
        dateto: '',

    }
    const onSubmit = (values) => {
      //  console.log("fv", values); 
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    });
    const [rowno, setrowno] = useState(1);

    const columns = [
        { accessorKey: 'Dated', header: 'Dated', size: 50 },
        { accessorKey: 'Registration_Id', header: 'Registration ID', size: 50 },
        {
            accessorKey: 'Ptype', header: 'Patient Type', size: 50, filterVariant: 'select',
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
            accessorKey: 'Condition_Type', header: 'Condition Type', size: 50, filterVariant: 'select',
            filterSelectOptions: ["Orthopedic", "Neurological"]
        },
        { accessorKey: 'Clinical_Conditions', header: 'Provisional Diagnosis', size: 50 },
        { accessorKey: 'Treatments', header: 'Treatments', size: 50 },
        { accessorKey: 'Supportive_Services', header: 'Supportive Services', size: 50 },
    ]
    return (
        <div className="input-boxes">
            <form id="physioregister" onSubmit={formik.handleSubmit}>
                <div className="row">
                    <div className="col-20"><label>Date From</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="datefrom" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}><label >Date To</label></div>
                    <div className="col-25"><input type="date" className="input-com" name="dateto" onChange={formik.handleChange} /></div>
                    <div className="col-20" style={{ textAlign: "center" }}> <button type="submit" form="physioregister" className="btn" style={{ width: "120px" }} onClick={getdetails}>View</button></div>
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
                                {<Button
                                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //export all rows, including from the next page, (still respects filtering and sorting)
                                    onClick={() =>
                                        //   handleExportRows(table.getPrePaginationRowModel().rows)

                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Physiotherapy Register", process.env.REACT_APP_COMPANY_NAME)

                                    }
                                    startIcon={<FileDownloadIcon />}
                                    variant="contained"
                                >
                                    Export Pdf on A4
                      </Button>}

                                {/* {console.log("Selected cols", (table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'))} */}
                                <Button
                                    disabled={table.getPrePaginationRowModel().rows.length === 0}
                                    //export all rows, including from the next page, (still respects filtering and sorting)
                                    onClick={() =>
                                        //   handleExportRows(table.getPrePaginationRowModel().rows)

                                        ExportPdf((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Physiotherapy Register", process.env.REACT_APP_COMPANY_NAME, "A3")

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
                                        ExportCsv((table.getVisibleFlatColumns().map((col) => (col.columnDef))).filter(col => col.header !== 'Row Numbers'), table.getPrePaginationRowModel().rows.map((row) => row.original), "Physiotherapy Register")

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
            </form>
        </div>
    );
}