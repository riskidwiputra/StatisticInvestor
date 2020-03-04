<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-newspaper"></i>
            </span> Add News </h3>
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>


            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Add News Monthly </h6>
                </div>
                <div class="card-body">
                <form action="<?= BASEURL ?>/insert-news" method="post" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-lg-7">
                            <div class="form-group">
                                <label for="title">Title</label> 
                                <div class="input-group mb-3">
                                <input type="text" name="title" class="form-control" placeholder="Enter your Title..." required="">
                                <input type="hidden" name="category" value="monthly">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="content">Content</label> 
                                <div class="input-group mb-3">
                                <textarea class="form-control ckeditor upload" name="content" data-portal="<?= paths('path_portal_News'); ?>" placeholder="Enter your Content..." required="" rows="10"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-group mb-3">
                                    <img class="pb-1" src="<?=asset('assets/images/unnamed.jpg');?>" id="imgdaily" name="imgdaily" width="100%">
                                    <input type="file" name="foto" id="foto" required="">
                                </div>
                            </div>
                        </div>
                      
                    </div>
                    
                    <hr>
                    <button type="submit" class="btn btn-facebook btn-user btn-block">
                        Add News Monthly
                    </button>
                    </form>
                </div>
                
            </div>
        </div>
        </div>

    </div>



    </div>

