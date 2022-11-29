import React from 'react';

export default function Cardwidget(props) {

    const widgetstyle = {
        cardcont: {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '100%',
            padding: 12,
            borderRadius: 4,
            boxShadow: '3px 3px 15px 0 rgba(0, 0, 0, 0.5)',
            letterSpacing: 1.5,
            
        },
        widgetheader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 14
        },
        headericon: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: 88,
            width: 88,
            backgroundColor: props.bgcolor,
            borderColor: props.bgcolor,
            borderRadius: 4,
            top: -27,
            marginBottom: -24,
            boxShadow: '0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)'
        },
        iconImg: {
            fontSize: 32,
            color: '#fff',
        },
        widgetfooter: {
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#9e9e9e',
            fontWeight: 300,
            marginLeft: 10,
            marginRight: 10,
        },
        headercontent: {
            display: 'flex',
            // flexDirection: 'column',
            textAlign: 'center',

        },
        headertitle: {
            color: '#9e9e9e',
            fontWeight: 300,
            fontSize: 14,
            display:'flex',
            alignItems:'center',
          justifyContent:'center'


        },

        headerbody: {
            fontWeight: 500,
            fontSize: '1.30rem',
            color: 'rgba(0,0,0,.87)',
            padding: 5,
            textAlign:'right'
        }

    }

    return (
        <div style={widgetstyle.cardcont}>
            <div style={widgetstyle.widgetheader}>
                <div style={widgetstyle.headericon}>
                  
                    <i style={widgetstyle.iconImg}>{props.headericon}</i>
                </div>
                <div style={widgetstyle.headercontent}>
                    <div style={widgetstyle.headertitle}><span>{props.headertitle}</span></div>
                    {/* <h3 style={widgetstyle.headerbody}>{props.headerbody}</h3> */}
                </div>
              
            </div>
            <h3 style={widgetstyle.headerbody}>{props.headerbody}</h3>
            <div style={{ padding: 5, color: '#eee' }}>
                <hr></hr>
            </div>
            <div style={widgetstyle.widgetfooter}>
                <div>{props.footer1}</div>
                <div>{props.footer2}</div>
                <div>{props.footer3}</div>
            </div>
        </div>

    );

} 