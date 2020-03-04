<div class="main-panel ">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-12 grid-margin">
                <div class="card mb-3">
                
                    <div class="card-body">
                    <h2 class=" pb-3" ><?= $data['content']['title'] ?></h2>
                    <img class="card-img-top" src="<?= path("path_portal_News").$data['content']['image'] ?>" alt="Card image cap">
                
                        <p class="card-text"><?=   htmlspecialchars_decode($data['content']['content']) ?></p>
                    </div>
                </div>
            </div>
        </div>        
    </div>


