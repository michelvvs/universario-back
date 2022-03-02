const axios  = require('axios');
const cheerio = require('cheerio');

const getTopMusic = async(niverYear, niverMonth, niverDay) => {

    const list = []
  
    let urlBillboard = "https://www.billboard.com/charts/hot-100/" + niverYear + "-" + niverMonth + "-" + niverDay + "/"

    const {data} = await axios.get(urlBillboard);
    console.log(urlBillboard)
    const $ = cheerio.load(data)


    let completeData = new Date(niverYear,niverMonth - 1,niverDay ); 
    let diaSemana = completeData.getDay()
    completeData.setDate(completeData.getDate() + (6 - diaSemana))

    //console.log($(".o-chart-results-list__item.lrv-u-flex-grow-1.lrv-u-flex.lrv-u-flex-direction-column").find('h3')[0].text())

    $(".o-chart-results-list__item.lrv-u-flex-grow-1.lrv-u-flex.lrv-u-flex-direction-column").each((e, element) => {
        const musicTitle = $(element).find('h3').text().replace("\n","").replace("\n","")
        const musicArtist = $(element).find('span.c-label').text().replace("\n","").replace("\n","")
        if (musicTitle) {
            
            list.push({
                "title": musicTitle,
                "artist": musicArtist
            })
        } 

        if (e >= 4) {
            return false;
        }

    });
    return list
}


module.exports = getTopMusic