import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getConfig', (req) => {
    console.log(req);
  if(req.context.extension.gadgetConfiguration) {
    const cfg = req.context.extension.gadgetConfiguration;
    const { label, value, unit, trend, target } = cfg;
    return {ok:true, label, value, unit, trend, target};
  } else {
    return null;
  }
});

export const handler = resolver.getDefinitions();

