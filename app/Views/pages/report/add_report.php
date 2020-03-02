<div class="main-panel mt-5">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-home"></i>
            </span> Dashboard </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div> 
            
            
        <div class="col-md-6 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                <h4 class="card-title">Add Report</h4>
                <form class="" method="post" action="<?= BASEURL ?>/insert-report" enctype="multipart/form-data" >
                
                <div class="form-group">
                        <label>File upload</label>
                        <input type="file" name="img" class="file-upload-default" required="">
                        <div class="input-group col-xs-12">
                        <input type="text" class="form-control file-upload-info" disabled placeholder="Upload PDF">
                        <span class="input-group-append">
                            <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                        </span>
                        </div>
                    </div>
            

                    <button type="submit" class="btn btn-gradient-primary mr-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                </form>
                </div>
            </div>
        </div>
    </div>
