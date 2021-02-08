import React from 'react'
import Sidebar from './Sidebar';

function Studentdashboard() {
    

    return (
        <>
        <Sidebar/>
        <div className="content-wrapper">
        <section class="content">
      <div class="container-fluid">
        <h5 class="mb-2">Info Box</h5>
        <div class="row">
          <div class="col-md-3 col-sm-6 col-12">
            <div class="info-box">
              <span class="info-box-icon bg-danger"><i class="icon ion-folder"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Messages</span>
                <span class="info-box-number">1,410</span>
              </div>
             
            </div>
         </div>
          </div>
          </div>
          </section>
        </div>
       
        </>
    )
}

export default Studentdashboard;