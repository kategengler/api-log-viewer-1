import Ember from 'ember';
import startApp from '../helpers/start-app';
import Pretender from 'pretender';

var App, server;

function mockRequest( server, verb, url, responseBody, status, testRequest ) {
  status = status || 200;
  server.register( verb.toUpperCase(), url, function ( request ) {
    if ( testRequest ) {
      testRequest( JSON.parse( request.requestBody ), request);
    }
    return [ status, { "Content-Type": "application/json" }, JSON.stringify( responseBody )];
  });
}

var Responses = {
  events: [{"id":5268,"occurred_at":"2014-11-09T08:30:07Z","user_email":"epperson@fundinggates.com","description":"Sync #2435 (external_payments, update, epperson@fundinggates.com)","request_ids":[12112]},{"id":5272,"occurred_at":"2014-11-09T08:30:08Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2439 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12121,12120]},{"id":5269,"occurred_at":"2014-11-09T08:30:07Z","user_email":"epperson@fundinggates.com","description":"Sync #2435 (external_payments, update, epperson@fundinggates.com)","request_ids":[12113]},{"id":5307,"occurred_at":"2014-11-09T20:52:40Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2451 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12189,12188]},{"id":5346,"occurred_at":"2014-11-09T22:45:33Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2464 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12289,12288]},{"id":5271,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2437 (invoices, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12119,12117]},{"id":5314,"occurred_at":"2014-11-09T21:53:24Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2453 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12203,12202]},{"id":5358,"occurred_at":"2014-11-09T23:13:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2468 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12311]},{"id":5363,"occurred_at":"2014-11-09T23:27:58Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2469 (invoices, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12318,12317]},{"id":5273,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2437 (external_payments, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12123,12122]},{"id":5274,"occurred_at":"2014-11-09T08:30:08Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2439 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12125,12124]},{"id":5315,"occurred_at":"2014-11-09T22:06:12Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2454 (customers, full, accountingpackages@fundinggates.com)","request_ids":[12212,12211,12210,12209,12208,12207,12206,12205,12204]},{"id":5328,"occurred_at":"2014-11-09T22:30:55Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2458 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12251]},{"id":5349,"occurred_at":"2014-11-09T22:48:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2465 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12295,12294]},{"id":5354,"occurred_at":"2014-11-09T23:11:01Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2467 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12305,12304]},{"id":5356,"occurred_at":"2014-11-09T23:11:01Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2467 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12309,12308]},{"id":5365,"occurred_at":"2014-11-09T23:43:44Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2470 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12322,12321]},{"id":5275,"occurred_at":"2014-11-09T19:09:58Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2441 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12127,12126]},{"id":5280,"occurred_at":"2014-11-09T19:11:47Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2442 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12137,12136]},{"id":5297,"occurred_at":"2014-11-09T20:21:06Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2448 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12169,12168]},{"id":5316,"occurred_at":"2014-11-09T22:06:12Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2454 (invoices, full, accountingpackages@fundinggates.com)","request_ids":[12221,12220,12219,12218,12217,12216,12215,12214,12213]},{"id":5276,"occurred_at":"2014-11-09T19:09:58Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2441 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12129,12128]},{"id":5291,"occurred_at":"2014-11-09T20:15:59Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2446 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12157,12156]},{"id":5300,"occurred_at":"2014-11-09T20:21:53Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2449 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12175,12174]},{"id":5317,"occurred_at":"2014-11-09T22:06:12Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2454 (external_payments, full, accountingpackages@fundinggates.com)","request_ids":[12226,12225,12224,12223,12222]},{"id":5326,"occurred_at":"2014-11-09T22:17:16Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2457 (external_payments, update, accountingpackages@fundinggates.com)","request_ids":[12249,12248]},{"id":5332,"occurred_at":"2014-11-09T22:32:48Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2459 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12257,12256]},{"id":5342,"occurred_at":"2014-11-09T22:43:20Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2463 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12279,12278]},{"id":5353,"occurred_at":"2014-11-09T22:52:43Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2466 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12303,12302]},{"id":5366,"occurred_at":"2014-11-09T23:43:44Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2470 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12324,12323]},{"id":5277,"occurred_at":"2014-11-09T19:09:58Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2441 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12131,12130]},{"id":5292,"occurred_at":"2014-11-09T20:15:59Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2446 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12159,12158]},{"id":5318,"occurred_at":"2014-11-09T22:11:18Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2455 (customers, update, accountingpackages@fundinggates.com)","request_ids":[12228,12227]},{"id":5324,"occurred_at":"2014-11-09T22:17:16Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2457 (customers, update, accountingpackages@fundinggates.com)","request_ids":[12244,12243,12242,12241]},{"id":5337,"occurred_at":"2014-11-09T22:38:38Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2461 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12265,12264]},{"id":5352,"occurred_at":"2014-11-09T22:52:43Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2466 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12301,12300]},{"id":5361,"occurred_at":"2014-11-09T23:13:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2468 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12315]},{"id":5278,"occurred_at":"2014-11-09T19:11:47Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2442 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12133,12132]},{"id":5319,"occurred_at":"2014-11-09T22:11:18Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2455 (invoices, update, accountingpackages@fundinggates.com)","request_ids":[12231,12230,12229]},{"id":5327,"occurred_at":"2014-11-09T22:30:55Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2458 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12250]},{"id":5339,"occurred_at":"2014-11-09T22:41:14Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2462 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12271,12270]},{"id":5279,"occurred_at":"2014-11-09T19:11:47Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2442 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12135,12134]},{"id":5320,"occurred_at":"2014-11-09T22:11:18Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2455 (external_payments, update, accountingpackages@fundinggates.com)","request_ids":[12233,12232]},{"id":5255,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+magoo@gmail.com","description":"Sync #2438 (customers, update, marybethwilson+magoo@gmail.com)","request_ids":[12096]},{"id":5281,"occurred_at":"2014-11-09T20:06:23Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2443 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12139,12138]},{"id":5288,"occurred_at":"2014-11-09T20:10:02Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2445 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12151,12150]},{"id":5290,"occurred_at":"2014-11-09T20:10:02Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2445 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12155,12154]},{"id":5302,"occurred_at":"2014-11-09T20:21:53Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2449 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12179,12178]},{"id":5304,"occurred_at":"2014-11-09T20:22:52Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2450 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12183,12182]},{"id":5306,"occurred_at":"2014-11-09T20:52:40Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2451 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12187,12186]},{"id":5321,"occurred_at":"2014-11-09T22:13:30Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2456 (customers, update, accountingpackages@fundinggates.com)","request_ids":[12235,12234]},{"id":5330,"occurred_at":"2014-11-09T22:32:48Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2459 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12254]},{"id":5338,"occurred_at":"2014-11-09T22:38:38Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2461 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12269,12268,12267,12266]},{"id":5341,"occurred_at":"2014-11-09T22:41:14Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2462 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12277,12276,12275,12274]},{"id":5367,"occurred_at":"2014-11-09T23:43:44Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2470 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12328,12327,12326,12325]},{"id":5256,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+jimwelch@gmail.com","description":"Sync #2434 (customers, update, marybethwilson+jimwelch@gmail.com)","request_ids":[12097]},{"id":5282,"occurred_at":"2014-11-09T20:06:23Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2443 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12141,12140]},{"id":5296,"occurred_at":"2014-11-09T20:18:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2447 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12167,12166]},{"id":5299,"occurred_at":"2014-11-09T20:21:06Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2448 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12173,12172]},{"id":5301,"occurred_at":"2014-11-09T20:21:53Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2449 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12177,12176]},{"id":5311,"occurred_at":"2014-11-09T21:51:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2452 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12197,12196]},{"id":5322,"occurred_at":"2014-11-09T22:13:30Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2456 (invoices, update, accountingpackages@fundinggates.com)","request_ids":[12238,12237,12236]},{"id":5329,"occurred_at":"2014-11-09T22:30:55Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2458 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12253,12252]},{"id":5331,"occurred_at":"2014-11-09T22:32:48Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2459 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12255]},{"id":5345,"occurred_at":"2014-11-09T22:45:33Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2464 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12287,12286]},{"id":5357,"occurred_at":"2014-11-09T23:13:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2468 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12310]},{"id":5359,"occurred_at":"2014-11-09T23:13:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2468 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12313,12312]},{"id":5257,"occurred_at":"2014-11-09T08:30:07Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2436 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12098]},{"id":5258,"occurred_at":"2014-11-09T08:30:07Z","user_email":"epperson@fundinggates.com","description":"Sync #2435 (customers, update, epperson@fundinggates.com)","request_ids":[12106,12099]},{"id":5283,"occurred_at":"2014-11-09T20:06:23Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2443 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12143,12142]},{"id":5284,"occurred_at":"2014-11-09T20:08:46Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2444 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12145,12144]},{"id":5303,"occurred_at":"2014-11-09T20:22:52Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2450 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12181,12180]},{"id":5323,"occurred_at":"2014-11-09T22:13:30Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2456 (external_payments, update, accountingpackages@fundinggates.com)","request_ids":[12240,12239]},{"id":5325,"occurred_at":"2014-11-09T22:17:16Z","user_email":"accountingpackages@fundinggates.com","description":"Sync #2457 (invoices, update, accountingpackages@fundinggates.com)","request_ids":[12247,12246,12245]},{"id":5335,"occurred_at":"2014-11-09T22:35:45Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2460 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12261,12260]},{"id":5347,"occurred_at":"2014-11-09T22:45:33Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2464 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12291,12290]},{"id":5351,"occurred_at":"2014-11-09T22:52:43Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2466 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12299,12298]},{"id":5360,"occurred_at":"2014-11-09T23:13:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2468 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12314]},{"id":5259,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2437 (customers, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12116,12100]},{"id":5261,"occurred_at":"2014-11-09T08:30:08Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2439 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12118,12101]},{"id":5285,"occurred_at":"2014-11-09T20:08:46Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2444 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12146]},{"id":5294,"occurred_at":"2014-11-09T20:18:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2447 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12163,12162]},{"id":5310,"occurred_at":"2014-11-09T21:51:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2452 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12195,12194]},{"id":5313,"occurred_at":"2014-11-09T21:53:24Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2453 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12201,12200]},{"id":5333,"occurred_at":"2014-11-09T22:35:45Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2460 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12258]},{"id":5336,"occurred_at":"2014-11-09T22:38:38Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2461 (customers, update, qb-test1@mbwconsultingservices.com)","request_ids":[12263,12262]},{"id":5350,"occurred_at":"2014-11-09T22:48:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2465 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12297,12296]},{"id":5260,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+jimwelch@gmail.com","description":"Sync #2434 (invoices, update, marybethwilson+jimwelch@gmail.com)","request_ids":[12102]},{"id":5264,"occurred_at":"2014-11-09T08:30:07Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2436 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12105]},{"id":5270,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+magoo@gmail.com","description":"Sync #2438 (external_payments, update, marybethwilson+magoo@gmail.com)","request_ids":[12115,12114]},{"id":5286,"occurred_at":"2014-11-09T20:08:46Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2444 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12147]},{"id":5334,"occurred_at":"2014-11-09T22:35:45Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2460 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12259]},{"id":5355,"occurred_at":"2014-11-09T23:11:01Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2467 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12307,12306]},{"id":5362,"occurred_at":"2014-11-09T23:27:58Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2469 (customers, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12316]},{"id":5262,"occurred_at":"2014-11-09T08:30:08Z","user_email":"test_stuff@example.com","description":"Sync #2440 (customers, update, test_stuff@example.com)","request_ids":[12103]},{"id":5265,"occurred_at":"2014-11-09T08:30:07Z","user_email":"epperson@fundinggates.com","description":"Sync #2435 (invoices, update, epperson@fundinggates.com)","request_ids":[12109,12107]},{"id":5287,"occurred_at":"2014-11-09T20:08:46Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2444 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12149,12148]},{"id":5289,"occurred_at":"2014-11-09T20:10:02Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2445 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12153,12152]},{"id":5305,"occurred_at":"2014-11-09T20:22:52Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2450 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12185,12184]},{"id":5308,"occurred_at":"2014-11-09T20:52:40Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2451 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12191,12190]},{"id":5340,"occurred_at":"2014-11-09T22:41:14Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2462 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12273,12272]},{"id":5263,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+jimwelch@gmail.com","description":"Sync #2434 (external_payments, update, marybethwilson+jimwelch@gmail.com)","request_ids":[12104]},{"id":5267,"occurred_at":"2014-11-09T08:30:07Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2436 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12111,12110]},{"id":5293,"occurred_at":"2014-11-09T20:15:59Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2446 (external_payments, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12161,12160]},{"id":5298,"occurred_at":"2014-11-09T20:21:06Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2448 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12171,12170]},{"id":5312,"occurred_at":"2014-11-09T21:53:24Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2453 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12199,12198]},{"id":5343,"occurred_at":"2014-11-09T22:43:20Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2463 (invoices, update, qb-test1@mbwconsultingservices.com)","request_ids":[12281,12280]},{"id":5348,"occurred_at":"2014-11-09T22:48:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2465 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12293,12292]},{"id":5364,"occurred_at":"2014-11-09T23:27:58Z","user_email":"marybethwilson+moniquemiles@gmail.com","description":"Sync #2469 (external_payments, update, marybethwilson+moniquemiles@gmail.com)","request_ids":[12320,12319]},{"id":5266,"occurred_at":"2014-11-09T08:30:07Z","user_email":"marybethwilson+magoo@gmail.com","description":"Sync #2438 (invoices, update, marybethwilson+magoo@gmail.com)","request_ids":[12108]},{"id":5295,"occurred_at":"2014-11-09T20:18:16Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2447 (invoices, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12165,12164]},{"id":5309,"occurred_at":"2014-11-09T21:51:50Z","user_email":"marybethwilson+pinkpanther@gmail.com","description":"Sync #2452 (customers, update, marybethwilson+pinkpanther@gmail.com)","request_ids":[12193,12192]},{"id":5344,"occurred_at":"2014-11-09T22:43:20Z","user_email":"qb-test1@mbwconsultingservices.com","description":"Sync #2463 (external_payments, update, qb-test1@mbwconsultingservices.com)","request_ids":[12285,12284,12283,12282]}],
  request: {
      id: 1,
      request_url: "/api.xro/2.0/CreditNotes?where=%28Status%3D%22AUTHORISED%22+OR+Status%3D%22PAID%22+OR+Status%3D%22VOID%22%29+AND+Type%3D%3D%22ACCRECCREDIT%22",
      request_method: "GET",
      request_headers: '{"charset":"utf-8", "If-Modified-Since":"2014-11-03T15:18:16"}',
      request_body: "",
      response_status: 200,
      response_headers: '{"cache-control":["private"], "content-type":["text/xml; charset=utf-8"], "vary":["Accept-Encoding"], "www-authenticate":["OAuth Realm=\"api-partner.network.xero.com\""], "x-s":["445761-O1VMAP04"], "strict-transport-security":["max-age=31536000"], "date":["Mon, 10 Nov 2014 15:19:50 GMT"], "connection":["close"], "content-length":["1691"]}',
      response_body: "<Response xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n  <Id>d749e455-e9fd-47d6-8bab-bfe38d8ac27a</Id>\r\n  <Status>OK</Status>\r\n  <ProviderName>Funding Gates</ProviderName>\r\n  <DateTimeUTC>2014-11-10T15:19:51.4710389Z</DateTimeUTC>\r\n  <CreditNotes>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>68f77ee2-e4ce-4afe-89e5-2cae62b5d8fa</ContactID>\r\n        <Name>Dallas Flooring Shop</Name>\r\n      </Contact>\r\n      <Date>2014-11-07T00:00:00</Date>\r\n      <Status>AUTHORISED</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-08T00:25:26.747</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>e4d6e42e-7447-4187-b7ba-3d96e319d457</CreditNoteID>\r\n      <CreditNoteNumber>CN-0271</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>25.00</RemainingCredit>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>eaa94709-ae02-461a-8675-d57d86580a9b</ContactID>\r\n        <Name>West Coast Security</Name>\r\n      </Contact>\r\n      <Date>2014-11-07T00:00:00</Date>\r\n      <Status>AUTHORISED</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-08T00:31:50.28</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>07c48e95-1748-46fb-9439-60482bebfbf9</CreditNoteID>\r\n      <CreditNoteNumber>CN-0273</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>25.00</RemainingCredit>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>2b06557f-86d5-4d10-8c28-26e273737668</ContactID>\r\n        <Name>Allen Drywall</Name>\r\n      </Contact>\r\n      <Date>2014-11-09T00:00:00</Date>\r\n      <Status>AUTHORISED</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-09T20:17:22.79</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>c9813367-89b4-4e1e-9acf-61737635e2fd</CreditNoteID>\r\n      <CreditNoteNumber>CN-0277</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>25.00</RemainingCredit>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>5ec8f7c5-b8a0-484a-afa4-4546c190afc1</ContactID>\r\n        <Name>Addamore Appraisers</Name>\r\n      </Contact>\r\n      <Date>2014-11-05T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>77.65</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>77.65</Total>\r\n      <UpdatedDateUTC>2014-11-06T00:52:50.563</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-05T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <Reference>inv 0029</Reference>\r\n      <CreditNoteID>6078929c-2efe-42c0-8007-2ed4d9d340a3</CreditNoteID>\r\n      <CreditNoteNumber>CN-0262</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Allocations>\r\n        <Allocation>\r\n          <AppliedAmount>77.65</AppliedAmount>\r\n          <Date>2014-11-05T00:00:00</Date>\r\n          <Invoice>\r\n            <InvoiceID>8afea216-03db-49af-acae-dd42d2eed678</InvoiceID>\r\n            <InvoiceNumber>INV-0029</InvoiceNumber>\r\n          </Invoice>\r\n        </Allocation>\r\n      </Allocations>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>7b6d0690-2345-4dc7-b4db-c4148c35106a</ContactID>\r\n        <Name>KLS Planning &amp; Design</Name>\r\n      </Contact>\r\n      <Date>2014-11-06T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-09T19:13:08.51</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-09T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>9ee76285-0208-45cd-a02b-8664bb882a7b</CreditNoteID>\r\n      <CreditNoteNumber>CN-0266</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Allocations>\r\n        <Allocation>\r\n          <AppliedAmount>25.00</AppliedAmount>\r\n          <Date>2014-11-09T00:00:00</Date>\r\n          <Invoice>\r\n            <InvoiceID>f1883f2d-371c-4a5f-a26d-05d49f1614e4</InvoiceID>\r\n            <InvoiceNumber>INV-0274</InvoiceNumber>\r\n          </Invoice>\r\n        </Allocation>\r\n      </Allocations>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>843aaef3-e25b-4d74-8116-1d7eab686ef7</ContactID>\r\n        <Name>Datamaxx USA Corporation</Name>\r\n      </Contact>\r\n      <Date>2014-11-06T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>Exclusive</LineAmountTypes>\r\n      <SubTotal>100.00</SubTotal>\r\n      <TotalTax>6.25</TotalTax>\r\n      <Total>106.25</Total>\r\n      <UpdatedDateUTC>2014-11-06T21:58:10.013</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-06T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <Reference>inv 1</Reference>\r\n      <CreditNoteID>3ca88a0a-b3e4-4206-ba3e-0485db29eeb4</CreditNoteID>\r\n      <CreditNoteNumber>CN-0267</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Allocations>\r\n        <Allocation>\r\n          <AppliedAmount>106.25</AppliedAmount>\r\n          <Date>2014-11-06T00:00:00</Date>\r\n          <Invoice>\r\n            <InvoiceID>68c488a6-f01d-4e35-9d24-fdec9e635e25</InvoiceID>\r\n            <InvoiceNumber>INV-0001</InvoiceNumber>\r\n          </Invoice>\r\n        </Allocation>\r\n      </Allocations>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>8446532e-2a72-4631-98b0-6bb51f488f14</ContactID>\r\n        <Name>ClenaCorp</Name>\r\n      </Contact>\r\n      <Date>2014-11-06T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-06T22:00:55.47</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-06T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>7eebe0b4-e31d-42d8-857a-78b85539c9f2</CreditNoteID>\r\n      <CreditNoteNumber>CN-0268</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Allocations>\r\n        <Allocation>\r\n          <AppliedAmount>25.00</AppliedAmount>\r\n          <Date>2014-11-06T00:00:00</Date>\r\n          <Invoice>\r\n            <InvoiceID>078be8b5-3b3e-4547-b2ba-553aa2191dd9</InvoiceID>\r\n            <InvoiceNumber>INV-0137</InvoiceNumber>\r\n          </Invoice>\r\n        </Allocation>\r\n      </Allocations>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>2608c6ad-2eac-454e-8f06-9960ecba57d8</ContactID>\r\n        <Name>Rover.com</Name>\r\n      </Contact>\r\n      <Date>2014-11-07T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>100.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>100.00</Total>\r\n      <UpdatedDateUTC>2014-11-08T00:24:20.57</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-07T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>6e381cb4-0005-49b7-807f-1dea6a0057d9</CreditNoteID>\r\n      <CreditNoteNumber>CN-0270</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Allocations>\r\n        <Allocation>\r\n          <AppliedAmount>100.00</AppliedAmount>\r\n          <Date>2014-11-07T00:00:00</Date>\r\n          <Invoice>\r\n            <InvoiceID>f306e72b-1f13-46c9-9d1a-f2b08c14ca43</InvoiceID>\r\n            <InvoiceNumber>INV-0158</InvoiceNumber>\r\n          </Invoice>\r\n        </Allocation>\r\n      </Allocations>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n    <CreditNote>\r\n      <Contact>\r\n        <ContactID>1b784715-df9c-4800-9764-d2c0677dc673</ContactID>\r\n        <Name>Mill Valley Photo Shop</Name>\r\n      </Contact>\r\n      <Date>2014-11-09T00:00:00</Date>\r\n      <Status>PAID</Status>\r\n      <LineAmountTypes>NoTax</LineAmountTypes>\r\n      <SubTotal>25.00</SubTotal>\r\n      <TotalTax>0.00</TotalTax>\r\n      <Total>25.00</Total>\r\n      <UpdatedDateUTC>2014-11-09T20:11:16.42</UpdatedDateUTC>\r\n      <CurrencyCode>USD</CurrencyCode>\r\n      <FullyPaidOnDate>2014-11-09T00:00:00</FullyPaidOnDate>\r\n      <Type>ACCRECCREDIT</Type>\r\n      <CreditNoteID>48b38706-13a8-4e7d-8b1a-77a752e466ff</CreditNoteID>\r\n      <CreditNoteNumber>CN-0275</CreditNoteNumber>\r\n      <CurrencyRate>1.000000</CurrencyRate>\r\n      <RemainingCredit>0.00</RemainingCredit>\r\n      <Payments>\r\n        <Payment>\r\n          <PaymentID>9bbd1c05-7066-4765-a309-c0d45f12147f</PaymentID>\r\n          <Date>2014-11-09T00:00:00</Date>\r\n          <Amount>25.00</Amount>\r\n          <CurrencyRate>1.000000</CurrencyRate>\r\n        </Payment>\r\n      </Payments>\r\n      <HasAttachments>false</HasAttachments>\r\n    </CreditNote>\r\n  </CreditNotes>\r\n</Response>",
      occurred_at: new Date()
  }
};

module('Acceptance: Events', {
  setup: function() {
    server = new Pretender(function(){
      this.unhandledRequest = function(verb, path, request) {
        ok( false, "Request not handled: " + verb + " " + path);
      };
    });

    App = startApp();

    mockRequest(server, "get", "/api/filters", {filters: [{id: 1, email: 'test@example.com'}]});
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

function mockEventsRequestNoFilters(){
  mockRequest(server, "get", "/api/events", {events: Responses.events});
}
test('visiting /events', function() {
  mockEventsRequestNoFilters();
  visit('/events');

  andThen(function() {
    equal(currentPath(), 'events.index');
  });
});

test('root redirects to /events', function(){
  mockEventsRequestNoFilters();
  visit('/');

  andThen(function(){
    equal(currentPath(), 'events.index');
  });
});

test('recent events display', function(){
  expect(2);
  mockRequest(server, "get", "/api/events", {events: Responses.events}, 200, function(body, request){
    deepEqual(request.queryParams, {filter: 'recent'});
  });
  visit('/events');

  andThen(function(){
    equal(find('.spec-event').length, 113, 'Recent events should display');
  });
});

test('recent events display their requests', function(){
  mockEventsRequestNoFilters();
  mockRequest(server, "get", "/api/requests/:request_id", {request: Responses.request});
  visit('/events');
  click('.spec-event:first a');
  andThen(function(){
    equal('/events/5264', currentURL());
    ok(find('.spec-request:contains(' + Responses.request.request_url + ')'), 'Should display the request URL');
  });
});

test('requests display their details', function(){
  mockEventsRequestNoFilters();
  mockRequest(server, "get", "/api/requests/:request_id", {request: Responses.request});
  visit('/events');
  click('.spec-event:first a');
  click('.spec-request:first a');
  andThen(function(){
    equal('/events/5264/requests/12105', currentURL());
    ok(find('.spec-request-data'), 'Should display the request data');
  });
});

test('can filter by email', function(){
  expect(2);
  mockEventsRequestNoFilters();
  visit('/events');
  andThen(function(){
    mockRequest(server, "get", "/api/events", {events: [Responses.events[0]]}, 200, function(body, request){
      equal(request.queryParams.email, 'epperson@fundinggates.com');
    });
  });
  fillIn('.spec-email-filter', 'epperson@fundinggates.com');
  click('.spec-filter');
  andThen(function(){
    equal(find('.spec-event').length, 1, 'Events returned by the filter should display');
  });
});

test('can filter by times', function(){
  expect(3);
  mockEventsRequestNoFilters();
  visit('/events');
  andThen(function(){
    mockRequest(server, "get", "/api/events", {events: [Responses.events[0]]}, 200, function(body, request){
      equal(window.moment.utc(request.queryParams.start ).toString(), window.moment.utc("2014-11-09T17:00:00.000Z" ).toString());
      equal(window.moment.utc(request.queryParams.end ).toString(), window.moment.utc("2014-11-14T17:00:00.000Z" ).toString());
    });
  });
  fillIn('.spec-start-time-filter', 'Nov 9 2014');
  fillIn('.spec-end-time-filter', 'Nov 14 2014');
  click('.spec-filter');

  andThen(function(){
    equal(find('.spec-event').length, 1, 'Events returned by the filter should display');
  });
});
