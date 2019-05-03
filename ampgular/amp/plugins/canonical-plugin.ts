import { RouteConfigLoadEnd } from '@angular/router';
import { InterpolationConfig } from '@angular/compiler';

 // tslint:disable

export  default async function (args: AmpDescription): Promise<AmpDescription> {

  const $ = args.cheerio;


  args['singleUniStyle'] = args['singleUniStyle'].replace(/\._nc\./g, '.');
  $('head').append(`<link rel="canonical" href="https://ampgular.com${args.route}">`);

  $('[id="sidenav"]').attr('style', null);



  if (args.route.substr(0, 7) === '/guide/') {
    $('[id="sidenav"]').addClass('initial-open');
    $('._ncmat-sidenav-content').addClass('initial-open');
    $('[id="menuOpen"]').replaceWith(`<amp-state id="menuOpen"> true </amp-state>`);
  }


  const classId = $('._ncaio-nav-item').children();
  classId.each(async (index:number, idEle:any) => {

      const tap =
        'tap:AMP.setState({' + 'level1Open' + index + ':!' + 'level1Open' + index + ', level1Selected: ' + index + '})';

     const level1Heading =  $(idEle).children('.heading.level-1')

     level1Heading.each(async (index1:number, idLevel1:any) => {
      idLevel1['attribs']['on'] = tap;
      if (idLevel1.tagName !== 'button') {
        idLevel1['attribs']['role'] = 'button';
        idLevel1['attribs']['tabindex'] = '';
      }

      let oldCl= idLevel1['attribs']['class'] || '';
      oldCl = oldCl.replace('expanded',' ').replace('collapsed',' ')

      let dynamicClass = `level1Open${index} && level1Selected==${index}? 'expanded selected ${oldCl}': !level1Open${index} && level1Selected==${index}? 'selected collapsed ${oldCl}' : level1Open${index} && level1Selected!=${index}? 'expanded ${oldCl}'   : 'collapsed ${oldCl}'`
      idLevel1['attribs']['[class]'] = dynamicClass;

     })

     const level1HeadingChildren =  $(idEle).children('.heading-children.level-1')
         level1HeadingChildren.each(async (index1:number, idLevelChildren1:any) => {

      let oldCl= idLevelChildren1['attribs']['class'] || '';
      oldCl = oldCl.replace('expanded',' ').replace('collapsed',' ')

      let dynamicClass = `level1Open${index} && level1Selected==${index}? 'expanded selected ${oldCl}': !level1Open${index} && level1Selected==${index}? 'selected collapsed ${oldCl}' : level1Open${index} && level1Selected!=${index}? 'expanded ${oldCl}'   : 'collapsed ${oldCl}'`
      idLevelChildren1['attribs']['[class]'] = dynamicClass;

    })


      const level2Heading = $(idEle).children('.heading.level-2')
      level2Heading.each(async (index2:number, idLevel2:any) => {
        const tap2 =
        'tap:AMP.setState({' + 'level2Open' + index + ':!' + 'level1Open' + index + ', level2Selected: ' + index+ '})';

        idLevel2['attribs']['on'] = tap2;
        if (idLevel2.tagName !== 'button') {
          idLevel2['attribs']['role'] = 'button';
          idLevel2['attribs']['tabindex'] = '';
        }

        let oldCl= idLevel2['attribs']['class'] || '';
        oldCl = oldCl.replace('expanded',' ').replace('collapsed',' ')

        let dynamicClass = `level2Open${index} && level2Selected==${index}? 'expanded selected ${oldCl}': !level2Open${index} && level2Selected==${index}? 'selected collapsed ${oldCl}' : level2Open${index} && level2Selected!=${index}? 'expanded ${oldCl}'   : 'collapsed ${oldCl}'`
        idLevel2['attribs']['[class]'] = dynamicClass;

       })

       const level2HeadingChildren =  $(idEle).children('.heading-children.level-2')
       level2HeadingChildren.each(async (index4:number, idLevelChildren1:any) => {

        let oldCl= idLevelChildren1['attribs']['class'] || '';
        oldCl = oldCl.replace('expanded',' ').replace('collapsed',' ')

        let dynamicClass = `level2Open${index} && level2Selected==${index}? 'expanded selected ${oldCl}': !level2Open${index} && level2Selected==${index}? 'selected collapsed ${oldCl}' : level2Open${index} && level2Selected!=${index}? 'expanded ${oldCl}'   : 'collapsed ${oldCl}'`
        idLevelChildren1['attribs']['[class]'] = dynamicClass;
       })





  })
  $('head').append(`<script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js"></script>`)
  $('head').append(`<script async custom-element="amp-position-observer" src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js"></script>`)
  $('body').prepend(`<amp-animation id="fadeOut" layout="nodisplay">
  <script type="application/json">
    {
      "duration": "200ms",
      "fill": "both",
      "easing": "ease-out",
      "iterations": "1",
      "animations": [{
        "selector": ".toc-inner ul.toc-list li a",
        "keyframes": [{
          "opacity":"0.2"
          },
          {
            "opacity":"0.2"
          }
        ]
      }]
    }
  </script>
</amp-animation>`)

 const myH1 = $('h1');


 $('body').prepend(`
 <amp-animation id="h2${0}"
 layout="nodisplay">
 <script type="application/json">
   {
     "duration": "500ms",
     "fill": "both",
     "easing": "ease-out",
     "iterations": "1",
     "animations": [{
       "selector": ".toc-inner ul.toc-list li[title='${myH1.text()}'] a",
       "keyframes": [{
         "opacity":"0","transform":"1"
         },
         {
           "opacity":"0.8", "transform":"1.3"
         }
       ]
     }]
   }
 </script>
 </amp-animation>
 <amp-position-observer target="${myH1.attr('id')}" viewport-margins="20vh 70vh" intersection-ratios="1"
 on="enter:fadeOut.start,h2${0}.start" layout="nodisplay"></amp-position-observer>
 `)



   const myH2 = $('h2');





   myH2.each(async (indexH2:number, idH2:any) => {
   $('body').prepend(`
    <amp-animation id="h2${indexH2+1}"
    layout="nodisplay">
    <script type="application/json">
      {
        "duration": "500ms",
        "fill": "both",
        "easing": "ease-out",
        "iterations": "1",
        "animations": [{
          "selector": ".toc-inner ul.toc-list li[title='${$(idH2).text()}'] a",
          "keyframes": [{
            "opacity":"0","transform":"1"
            },
            {
              "opacity":"0.8", "transform":"1.3"
            }
          ]
        }]
      }
    </script>
    </amp-animation>
    <amp-position-observer target="${$(idH2).attr('id')}" viewport-margins="20vh 70vh" intersection-ratios="1"
    on="enter:fadeOut.start,h2${indexH2+1}.start" layout="nodisplay"></amp-position-observer>
    `)


   })









// [class]=" menuOpen && navMenu==0? 'open selected ng-star-inserted'
// : !menuOpen && navMenu==0? 'selected ng-star-inserted'
// : menuOpen && navMenu!=0? 'open ng-star-inserted'
//: 'ng-star-inserted'" class="ng-star-inserted"

$('head').append(`<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+" crossorigin="anonymous">`)

const iTag = $('i')
iTag.each(async (indexi:number, idi:any) => {

  if ($(idi).text()=='mode_edit'){
    $(idi).text('');
    $(idi).attr('class','fa fa-edit')
  }
  if ($(idi).text()=='link'){
    $(idi).text('');
    $(idi).attr('class','fa fa-link')
  }

})


  return args;
}
