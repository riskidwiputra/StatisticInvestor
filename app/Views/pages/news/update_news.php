<div class="main-panel ">
        <div class="content-wrapper">
        
        
        <div class="page-header">
            <h3 class="page-title">
            <span class="page-title-icon bg-gradient-primary text-white mr-2">
                <i class="mdi mdi-newspaper"></i>
            </span> Update News </h3>
          
            <nav aria-label="breadcrumb">
            
            </nav>
        </div>


            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Update News </h6>
                </div>
                
                <div class="card-body">
        
                <form action="<?= BASEURL ?>/update-news/<?= $data['content']['id_news'] ?>" method="post" enctype="multipart/form-data">

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="title">Title</label> 
                                <div class="input-group mb-3">
                                    <input type="text" name="title" class="form-control" value="<?= $data['content']['title'] ?>" required="">
                                </div>
                            </div>
                        </div>   
                    </div>   
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-group mb-3">
                                    <img class="pb-1" src="<?= path("path_portal_News").$data['content']['image'] ?>" id="imgdaily" name="imgdaily" width="300px" height="200px">
                                    <input type="file" name="foto" id="foto" >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label for="content">Content</label> 
                                <div class="input-group mb-3"><textarea class="form-control" name="desc" id="descAnnouncement" rows="4"><?=str_replace('public/', url().'/public/', $data['content']['content']);?></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <hr>
                    <button type="submit" class="btn btn-facebook btn-user btn-block">
                        UPDATE
                    </button>
                    </form>
                </div>
            </div>
        </div>
        </div>

    </div>



    </div>

