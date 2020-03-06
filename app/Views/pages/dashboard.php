<div class="main-panel ">
          <div class="content-wrapper">
        
          <?php Flasher::flash();?>
          
        

        

            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-home"></i>
                </span> Dashboard </h3>
                <?php if(Session::check('superadmin') || Session::check('admin') == true ){ }else{ ?>
                
            
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active align-middle" aria-current="page">
                    Nilai Saham Anda<br><h4 class="text-success"><?= IDR
                    ($data['saldo']); ?></h4>
                    <?php if ($data['saldo']) ?>  
                  </li>
                  <li>
                  <i class="mdi mdi-wallet icon-md text-primary pl-2 align-middle d-none d-xl-block"></i>
                  </li>
                </ul>
              </nav>
              <?php } ?>
            </div>

            <div class="row">
              <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                
                      <figure class="highcharts-figure">
                        <div id="container" class="d-none d-lg-block d-xl-block"></div>
                        <div id="chartpie" class="d-xl-none d-lg-none"></div>
                        <p class="highcharts-description">
                  
                        </p>
                    </figure>

                  </div>
                </div>
              </div>
            </div>




            <div class="row">
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-danger card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Total Lembar Saham <i class="mdi mdi-chart-line mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5"><?= Format($data['saham']['total_saham']); ?></h2> 
                  </div>
                </div>
              </div>
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-info card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Saham Perlembar <i class="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                    </h4>
                    <!-- IDR 268.000,00-, -->
                    <h2 class="mb-5"><?= IDR($data['saham']['harga_persaham']); ?></h2> 
                    <h6 class="card-text">1 Lot = 100 Lembar</h6>
                  </div>
                </div>
              </div>
              <div class="col-md-4 stretch-card grid-margin">
                <div class="card bg-gradient-success card-img-holder text-white">
                  <div class="card-body">
                    <img src="<?=asset('assets/images/dashboard/circle.svg');?>" class="card-img-absolute" alt="circle-image" />
                    <h4 class="font-weight-normal mb-3">Nilai Valuatif Perusahaan  <i class="mdi mdi-diamond mdi-24px float-right"></i>
                    </h4>
                    <h2 class="mb-5">IDR 13.4M</h2> 
                  </div>
                </div>
              </div>
            </div>
            
            <div class="page-header">
              <h3 class="page-title">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> News </h3>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page">
                    <span></span>Overview <i class="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="row">
            <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Daily</h4>
                        <?php if($data['daily']){ ?>
                        <?php foreach ($data['daily'] as $rows) { ?>
                        <div class="media pt-4">
                            <a href="<?= url('news/').$rows['url']; ?>">
                            <img class="align-self-start mr-3" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">
                            </a>
                            <div class="media-body d-none d-xl-block">      
                                <div class="pb-2">
                                </div>
                                <a href="<?= url('news/').$rows['url']; ?>">
                                <h5 class="mt-0"><?= strtoupper($rows['title']) ?>
                                </a>
                                </h5>
                                <p style="margin-top:-15px;">
                                <?php  
                                $text = htmlspecialchars_decode($rows['content']);
                                if ( str_word_count($rows['content']) > 60 ){
                                echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                } else {
                                echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                }?>
                                </p>
                            </div> 
                        </div>
                        <?php } ?>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination text-primary justify-content-center ">
                                <?php if (isset($data['page-daily'])) {
                                if ($data['page-daily'] == 1) { ?>
                                <li class="page-item"><a class="page-link" ><i class="fa fa-angle-left"></i></a></li>
                                <?php  
                                }else {
                                $link_prev = ($data['page-daily'] > 1)? $data['page-daily'] - 1 : 1;
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_prev ?>"><i class="fa fa-angle-left"></i></a></li>
                                <?php
                                }
                                for ($i= $data['start_number']; $i <= $data['end_number']; $i++) { 
                                $link_active = ($data['page-daily'] == $i)? 'active' : '';
                                ?>
                                <li class="page-item <?= $link_active ?>"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $i ?>"><?= $i ?></a></li>
                                <?php
                                }
                                if ($data['page-daily'] == $data['jumlahHalaman']) {
                                ?>

                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }else{
                                $link_next = ($data['page-daily'] < $data['jumlahHalaman'])? $data['page-daily'] + 1 : $data['jumlahHalaman'];
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_next ?>""><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }
                                }else{?>
                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-left"></i></a></li>
                                <?php
                                for ($i=1; $i <= $data['jumlahHalamanDaily']; $i++) { 
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $i ?>"><?= $i ?></a></li>
                                <?php    
                                }
                                ?>
                                <?php
                                if ($data['jumlahHalamanDaily'] == 1) {
                                ?>
                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }else{
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/2"><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }
                                }
                                ?>
                            </ul>
                        </nav>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Monthly</h4>
                        <?php if($data['monthly']){ ?>
                        <?php foreach ($data['monthly'] as $rows) { ?>
                        <div class="media pt-4">
                        <img class="align-self-start mr-3" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:200px; height:100px;">
                            <div class="media-body d-none d-xl-block">
                                <h5 class="mt-0"><?= strtoupper($rows['title']) ?>
                                                                  </h5>
                                <p style="margin-top:-15px;">
                                    <?php  
                                    $text = htmlspecialchars_decode($rows['content']);
                                    if ( str_word_count($rows['content']) > 60 ){
                                    echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                    } else {
                                      echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                    }
                                    ?>
                                </p>
                            </div> 
                        </div>
                        <?php } ?>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination text-primary justify-content-center ">
                                <?php if (isset($data['page-monthly'])) {
                                if ($data['page-monthly'] == 1) { ?>
                                <li class="page-item"><a class="page-link" ><i class="fa fa-angle-left"></i></a></li>
                                <?php  
                                }else {
                                $link_prev = ($data['page-monthly'] > 1)? $data['page-monthly'] - 1 : 1;
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $link_prev ?>"><i class="fa fa-angle-left"></i></a></li>
                                <?php
                                }
                                for ($i= $data['start_number']; $i <= $data['end_number']; $i++) { 
                                $link_active = ($data['page-monthly'] == $i)? 'active' : '';
                                ?>
                                <li class="page-item <?= $link_active ?>"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $i ?>"><?= $i ?></a></li>
                                <?php
                                }
                                if ($data['page-monthly'] == $data['jumlahHalaman']) {
                                ?>

                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }else{
                                $link_next = ($data['page-monthly'] < $data['jumlahHalaman'])? $data['page-monthly'] + 1 : $data['jumlahHalaman'];
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $link_next ?>""><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }
                                }else{?>
                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-left"></i></a></li>
                                <?php
                                for ($i=1; $i <= $data['jumlahHalamanMonthly']; $i++) { 
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $i ?>"><?= $i ?></a></li>
                                <?php    
                                }
                                ?>
                                <?php
                                if ($data['jumlahHalamanMonthly'] == 1) {
                                ?>
                                <li class="page-item"><a class="page-link"><i class="fa fa-angle-right"></i></a></li>
                                <?php
                                }else{
                                ?>
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/2"><i class="fa fa-angle-right"></i></a></li>


                                <?php
                                }
                                }
                                ?>
                            </ul>
                        </nav>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
            <div class="page-header">
              <h6 class="page-title" style="font-size:16px;">
                <span class="page-title-icon bg-gradient-primary text-white mr-2">
                  <i class="mdi mdi-newspaper"></i>
                </span> Company Cash Flow Report </h6>
              <nav aria-label="breadcrumb">
                <ul class="breadcrumb">
                  <li class="breadcrumb-item active" aria-current="page"> 
                  </li>
                </ul>
              </nav>
            </div>
            <div class="row">
              <div class="col-md-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body"> 
                        <div class="row">
                            <div class="mx-auto">
                            <?php if($data['report']){ ?> 
                                <a href="<?= url('download-report/').$data['report']['id_report'] ?>"><button class="btn btn-outline-primary"><i class="mdi mdi-cloud-download"></i> Download Report</button> </a>
                            <?php }else{ ?>
                              <a href="<?= url('download-report/')?>4"><button class="btn btn-outline-primary"><i class="mdi mdi-cloud-download"></i> Download Report</button> </a>
                            <?php } ?>
                            </div>
                        </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->

<script src="<?= asset('assets/js/highcharts.js') ?>"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script>
<script src="https://code.highcharts.com/modules/data.js"></script>
<script src="https://code.highcharts.com/modules/drilldown.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script>
  Highcharts.chart('chartpie', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
        }
    },
    title: {
        text: 'Grafik Saham Investor'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:14px"><b>{series.name}</b></span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y} Lembar</b> of 50.000 Lembar<br/>',
        footerFormat: 'Percentage : {point.percentage:.1f}%'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },
    series: [{
        type: 'pie',
        name: "<?= $data['saham']['name_saham'] ?>",
        keys: ['name', 'y', 'selected'],
        data: [
          <?php foreach ($data['investasi'] as $rows){
            echo '{name:"'.$rows['id_investor'].'",y:'.$rows['total_saham'].',selected:"false"},';
          }?>    
        ],
        showInLegend: true
    }]
});
</script>

<script>
// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Grafik Saham Investor'
    },
    subtitle: {
        text: ' '
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total lembar saham (<?= Format($data['saham']['total_saham']); ?>)'
        }

    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y} Lembar</b> of 50.000 Lembar<br/>'
    },

    series: [
        {
            name: "<?= $data['saham']['name_saham'] ?>",
            colorByPoint: true,
            data: [
              <?php foreach ($data['investasi'] as $rows) {
              echo '{name:"'.$rows['id_investor'].'",y:'.$rows['total_saham'].',drilldown:"Chrome"},';
              } 
              ?>
            ]
        }
    ]
});
</script>