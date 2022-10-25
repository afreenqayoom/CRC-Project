import React from 'react';
export const RegisterPrint = React.forwardRef((props, ref) => {
    return (
        <div ref={ref}>
        
            <div className="head">
                <h1 style={{ textAlign: "center" }}>COMPOSITE REGIONAL CENTRE</h1>
                <h3 style={{ textAlign: "center" }}>(MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT. GOVT OF INDIA)</h3>
                <h3 style={{ textAlign: "center" }}>NEAR SKIMS MEDICAL COLLEGE,BEMINA,SRINAGAR-190017</h3>
            </div>

             <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Registration Id</label>
                    </div>
                    <div className="col-75">
                        {props.regId}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Date</label>
                    </div>
                    <div className="col-75">
                        {props.regDate}
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-30">
                    <label>Name</label>
                </div>
                <div className="col-70">
                    {props.pname}
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Parentage/Guard.</label>
                </div>
                <div className="col-70">
                    {props.parentage}
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Category</label>
                </div>
                <div className="col-70">
                    {props.category}
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Address</label>
                    </div>
                    <div className="col-75">
                        {props.address}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>District</label>
                    </div>
                    <div className="col-75">
                        {props.district}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Age</label>
                    </div>
                    <div className="col-75">
                        {props.age}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Gender</label>
                    </div>
                    <div className="col-75">
                        {props.gender}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-30">
                    <label>Phone No.</label>
                </div>
                <div className="col-70">
                    {props.phno}
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Educational Qualification</label>
                    </div>
                    <div className="col-75">
                        {props.qualification}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Religion</label>
                    </div>
                    <div className="col-75">
                        {props.religion}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Caste</label>
                    </div>
                    <div className="col-75">
                        {props.caste}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Martial Status</label>
                    </div>
                    <div className="col-75">
                        {props.martial}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Change in Martial Status after Disability</label>
                </div>
                <div className="col-70">
                    {props.martialchange}
                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Occupation Before Disability</label>
                    </div>
                    <div className="col-75">
                        {props.occupation}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Occupation After Disability</label>
                    </div>
                    <div className="col-75">
                        {props.occupationchange}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Family Occupation</label>
                </div>
                <div className="col-70">
                    {props.familyoccupation}

                </div>
            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Monthly Income Before Disability</label>
                    </div>
                    <div className="col-75">
                        {props.income}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Monthly Income After Disability</label>
                    </div>
                    <div className="col-75">
                        {props.incomechange}
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-50">
                    <div className="col-25">
                        <label>Cause of Disability</label>
                    </div>
                    <div className="col-75">
                        {props.disabilitycause}
                    </div>
                </div>
                <div className="col-50">
                    <div className="col-25" style={{ textAlign: "center" }}>
                        <label>Type Of Disability</label>
                    </div>
                    <div className="col-75">
                        {props.disabilitytype}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Part Of Body Affected</label>
                </div>
                <div className="col-70">
                {props.disabilityParts ? props.disabilityParts.toString():null}

                </div>
            </div>
            <div className="row">
                <div className="col-30">
                    <label>Disability Effect</label>
                </div>
                <div className="col-70">
                    {props.disability ? props.disability.toString():null}

                </div>
            </div>
            <div className="row">
                    <div className="col-30">
                        <label>Any other Disabled in Family</label>
                    </div>
                    <div className="col-70">
                    {props.familydisabled}
                    </div>
                </div>
                <div className="row">
                    <div className="col-50">
                        <div className="col-25">
                            <label>Total No. of Family Members</label>
                        </div>
                        <div className="col-75">
                        {props.totalfamily}
                        </div>
                    </div>
                    <div className="col-50">
                        <div className="col-25">
                            <label>Total No. of Disabled in Family</label>
                        </div>
                        <div className="col-75">
                        {props.totaldisabled}
                        </div>
                    </div>

                </div>
                <div className="row">
                    <label>Rehab. Facilities already availed to the person</label>
                </div>
                <div className="row">
                    
                    {props.rehab?props.rehab.toString():null}
                  
                </div>  
        </div>
    );

});
export default RegisterPrint;