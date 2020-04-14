<style>
  
</style>
<link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/stocktools/gui.css">
    <link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/annotations/popup.css">
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
                    <br>
                    <figure class="highcharts-figure">
                        <div id="container2" class="chart"></div>
                        <p class="highcharts-description2">
                  
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
                    <h3 class="mb-5"><?= IDR($data['saham']['harga_persaham']); ?></h3> 
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
                    <h3 class=""><?= IDR($data['valuatif']['nilai_valuatif']) ?></h3>
                    <h4 class="mb-5" style="margin-top:-5px">( <?= number_format_short($data['valuatif']['nilai_valuatif']) ?> )</h4>

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
            <!-- <section class="py-5 bg-warning py-5">
              <div class="container">
                  <div class="row mb-2">
                      <div class="col-md-12">
                        <a href="" class="text-dark">
                        <div class="card shadow">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-xs-3 col-sm-3 col-md-3 mr-0">
                                  <img class="card-img" src="https://picsum.photos/500/230" alt="Card image cap">
                                </br>
                                  </div>
                                  <div class="col-xs-8 col-sm-7 col-md-8">
                                  <h5>Car System Alerts</h5>
                                  <p>Check the battery and alternator conditions</p>
                                  </div>
                              </div>
                          </div>
                        </div>
                        </a>
                      </div>
                  </div>
                  
                  <div class="row mb-2">
                      <div class="col-md-12">
                        <a href="#" class="text-dark">
                        <div class="card shadow">
                          <div class="card-body">
                              <div class="row">
                                  <div class="col-xs-1 col-sm-2 col-md-1 mr-3">
                                  <i class="fa fa-tachometer fa-4x "></i></br>
                                  </div>
                                  <div class="col-xs-8 col-sm-7 col-md-8">
                                  <h5>Car System Alerts</h5>
                                  <p>Check the battery and alternator conditions</p>
                                  </div>
                              </div>
                          </div>
                        </div>
                        </a>
                      </div>
                  </div>
              </div>
          </section> -->
            <div class="row">
            <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Daily</h4>
                        <?php if($data['daily']){ ?>
                        <?php foreach ($data['daily'] as $rows) { ?>
                          <div class="row mt-4 ">
                            <div class="col-md-3 col-sm-5 ">
                              <a href="<?= url('news/').$rows['url']; ?>">
                              <img class="" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:100%;">
                              </a>
                            </div>
                            <div class="col-md-9 col-sm-7 ">
                                <a href="<?= url('news/').$rows['url']; ?>" style="text-decoration:none;">
                                <h4 class="mt-2" style="text-decoration:none;"><?= strtoupper($rows['title']) ?>
                                </a>
                                </h4>
                                
                                <p style="margin-top:-5px;" >
                                <?php  
                                 $text = htmlspecialchars_decode($rows['content']);
                                

                                 // echo $text." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                 $tes =filter_var($text, FILTER_SANITIZE_STRING);
                                 $text2= substr($tes,0,250);
                                 //  $text = htmlspecialchars_decode($rows['content']);
                                 echo $text2.". . . . .";
                                
                                // $text = htmlspecialchars_decode($rows['content']);
                                // if ( str_word_count($rows['content']) > 60 ){
                                // echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                // } else {
                                // echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                // }?>
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
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-daily/<?= $link_next ?>"><i class="fa fa-angle-right"></i></a></li>
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
                          <div class="row  mt-3">
                            <div class="col-md-3 col-sm-5 ">
                              <a href="<?= url('news/').$rows['url']; ?>">
                              <!-- <img class="" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:80%; height:100px;"> -->
                              <img class="" src="<?=path('path_portal_News');?><?= $rows['image'] ?>" alt="Generic placeholder image" style="width:100%;">
                              </a>
                            </div>
                            <div class="col-md-9 col-sm-7">
                                <a href="<?= url('news/').$rows['url']; ?>" style="text-decoration:none;">
                                <h5><?= strtoupper($rows['title']) ?>
                                </a>
                                </h5>
                                
                                <p style="margin-top:-5px;" >
                                <?php  
                                 $text = htmlspecialchars_decode($rows['content']);
                                

                                 // echo $text." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                 $tes =filter_var($text, FILTER_SANITIZE_STRING);
                                 $text2= substr($tes,0,250);
                                 //  $text = htmlspecialchars_decode($rows['content']);
                                 echo $text2.". . . . ." ;
                                
                                // $text = htmlspecialchars_decode($rows['content']);
                                // if ( str_word_count($rows['content']) > 60 ){
                                // echo  substr($text,0,250)." .... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>  " ;
                                // } else {
                                // echo $text."... <a href='".url('news/').$rows['url']."'><u>Selengkapnya</u></a>";
                                // }
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
                                <li class="page-item"><a class="page-link" href="<?= BASEURL ?>/news-monthly/<?= $link_next ?>"><i class="fa fa-angle-right"></i></a></li>
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
<script src="<?= asset('assets/vendors/js/modules/highstock.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/data.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/highcharts-3d.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/drilldown.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/exporting.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/export-data.js') ?>"></script>
<script src="<?= asset('assets/vendors/js/modules/accessibility.js') ?>"></script>

 

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


<script type="text/javascript">
 var data = [ 
        <?php for ($i=0; $i < $data['Jmlh'] ; $i++) {  ?>
        [
        Date.UTC(<?= $data['tglUsers'][$i] ?>),
        <?= $data['nilai_valuatif'][$i] ?>
        ],
        <?php } ?>
    ];

// Create the chart
Highcharts.stockChart('container2', {

rangeSelector: {
    selected: 5
},

// title: {
//     text: 'AAPL Stock Price'
// },

series: [{
    name: 'Nilai Valuatif',
    data: data,
    type: 'spline',
    tooltip: {
        valueDecimals: 2
    }
}]
});
    // var data = [ 
    //     <?php for ($i=0; $i < $data['Jmlh'] ; $i++) {  ?>
    //     [
    //     Date.UTC(<?= $data['tglUsers'][$i] ?>),
    //     5000000,
    //     7500000,
    //     4000000,
    //     5500000,
    //     <?= $data['nilai_valuatif'][$i] ?>
    //     ],
    //     <?php } ?>
    // ];

    //     // var data = [
            
    //     //    [
    //     //       Date.UTC(<?= $data['tglUsers'][1] ?>),
    //     //         999.12,
    //     //         188,
    //     //         186.78,
    //     //         187.5,
    //     //         <?= $data['nilai_valuatif'][1] ?>
    //     //     ],
    //     //     [
    //     //         1527773400000,
    //     //         187.22,
    //     //         188.23,
    //     //         186.14,
    //     //         186.87,
    //     //         27482800
    //     //     ],
    //     //     [
    //     //         1527859800000,
    //     //         187.99,
    //     //         190.26,
    //     //         187.75,
    //     //         190.24,
    //     //         23442500
    //     //     ],
    //     //     [
    //     //         1528119000000,
    //     //         1,
    //     //         1193.42,
    //     //         191.35,
    //     //         191.83,
    //     //         26266200
    //     //     ]
    //     // ];


  

    //         // split the data set into ohlc and volume
    //         var ohlc = [],
    //             volume = [],
    //             dataLength = data.length,
    //             i = 0;

    //         for (i; i < dataLength; i += 1) {
    //             ohlc.push([
    //                 data[i][0], // the date
    //                 data[i][1], // open
    //                 data[i][2], // high
    //                 data[i][3], // low
    //                 data[i][4] // close
    //             ]);

    //             volume.push([
    //                 data[i][0], // the date
    //                 data[i][5] // the volume
    //             ]);
    //         }

    //         Highcharts.stockChart('container2', {
        
    //             yAxis: [{
    //                 labels: {
    //                     align: 'left'
    //                 },
    //                 height: '80%',
    //                 resize: {
    //                     enabled: true
    //                 }
    //             }, {
    //                 labels: {
    //                     align: 'left'
    //                 },
    //                 top: '80%',
    //                 height: '20%',
    //                 offset: 0
    //             }],
    //             tooltip: {
    //                 shape: 'square',
    //                 headerShape: 'callout',
    //                 borderWidth: 0,
    //                 shadow: false,
    //                 positioner: function (width, height, point) {
    //                     var chart = this.chart,
    //                         position;

    //                     if (point.isHeader) {
    //                         position = {
    //                             x: Math.max(
    //                                 // Left side limit
    //                                 chart.plotLeft,
    //                                 Math.min(
    //                                     point.plotX + chart.plotLeft - width / 2,
    //                                     // Right side limit
    //                                     chart.chartWidth - width - chart.marginRight
    //                                 )
    //                             ),
    //                             y: point.plotY
    //                         };
    //                     } else {
    //                         position = {
    //                             x: point.series.chart.plotLeft,
    //                             y: point.series.yAxis.top - chart.plotTop
    //                         };
    //                     }

    //                     return position;
    //                 }
    //             },
    //             series: [{
    //                 type: 'ohlc',
    //                 id: 'aapl-ohlc',
    //                 name: 'AAPL Stock Price',
    //                 data: ohlc
    //             }, {
    //                 type: 'column',
    //                 id: 'aapl-volume',
    //                 name: 'AAPL Volume',
    //                 data: volume,
    //                 yAxis: 1
    //             }],
    //             responsive: {
    //                 rules: [{
    //                     condition: {
    //                         maxWidth: 800
    //                     },
    //                     chartOptions: {
    //                         rangeSelector: {
    //                             inputEnabled: false
    //                         }
    //                     }
    //                 }]
    //             }
    //         });

    </script>