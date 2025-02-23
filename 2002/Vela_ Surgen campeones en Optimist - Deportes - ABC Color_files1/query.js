window.addEventListener("setSlotRefresh" , (e) => {
    const { slots } = e.detail || {};
    if ( slots && Array.isArray(slots) ) {
      setInterval(() => {
          googletag.cmd.push(function() {
              console.log('refreshing slots', slots);
              googletag.pubads().refresh( slots );
          });
      }, 60000);
    }
}, false)
  
//Captura variables para DFP desde la url
const getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
};
  
//get meta tag content
const getMeta = ( metaName ) => {
    const metas = document.getElementsByTagName('meta');
    let mContent = null

    for (let i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute('name') === metaName) {
        mContent = metas[i].getAttribute('content');
      }
    }

    return (mContent === '/') ? 'portada' : mContent;
}

const getArticleUri = () => {
  let fullUrl = getMeta( 'cXenseParse:url' );

  if ( !fullUrl ) return null;

  const patt = /https?:\/\/(localhost|www.abc.com.py|abccolor-abccolor-(sandbox|prox).cdn.arcpublishing.com)\/([\w-/]+)\/\d{4}\/\d{2}\/\d{2}\//;

  return fullUrl.replace( patt, '' ).replace('/', '').substring( 0, 40 );
}

const getArticleTags = () => {
  try {
    const allTags = getMeta( 'cXenseParse:azp-tag' );
    if ( !allTags ) return null;
    return allTags.split(',');
  } catch (error) {
    console.log(`Error al obtener tags: ${error}`);    
    return null;
  }
}

const dfp_demo   = getQueryString("demo");
const seccion    = getMeta( 'section_id' )?.substring( 0, 40 );
const articleId  = getMeta( 'cXenseParse:articleid' );
const articleUri = getArticleUri();
const tags       = getArticleTags();