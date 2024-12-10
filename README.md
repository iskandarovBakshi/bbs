Qalan ishler:

butun data useStore hookundadir,
`setState` ile state-i deishdire bilersen.

Owner:

1. login et user: admin, password: admin
2. Barbershop elave et
3. Barbershopun adi, xidmet gosterdiyi vaxt araligi (mes: 11:00 - 23:00),
   adresi olmalidir
4. Barbershoplara barber elave et
5. barberin ad, soyad, xidmetleri(multiple xidmet sechile biler),
   adresi(barbershopdan gotur) olmalidir
6. Xidmetler hissesinde xidmet elave et
7. xidmetin adi, muddeti olmalidir

Barberlere barbershopun idsin de elave ede bilersen,
sonra bununla barberin hansi barbershopa aid olmasini bileceksen

storeda: barberShops arrayi var bele bir shey olmalidir:

```
{
  name: "Berberim.az",
  id: 1,
  schedule: "11:00 - 23:00",
  address: "E.cemil 65",
  barbers: [
    barbershopId: 1,
    name: "Fuad",
    surname: "Fuadov",
    services: [{ id: 1, name: "Hair", duration: 60 }],
    address: "E.cemil 65",
  ]
}
```

User:

1. Ana sehifede axtarish xanasinda axtarish et
2. axtarish barberin adi soyadi, unvanina gore olsun
3. chixan berberler siyahisinda appointment buttonu olsun
4. appointmente vurduqda eyer login olmayibsa
   (storeda loggedIn objectinden bileceksen) login sehifesine yoneltsin
5. yox eyer login olubsa modal achilacaq, modalda xidmet gun ve saat sechecek
6. tesdiq etdikde berberin cavabini gozleyin yazacaq


bunu storeda `appointments` arrayi yaradib appointment etdikde data push ede bilersen
mes:
```
{
  from: "user-id",
  to: "barber-id",
  services: [], // istifadecinin sechdiyi servisler
  status: "approved", // berber tesdiq etse approved, reject etse reject. yeni yaranan appointment pending olacaq.
  time: "11.12.2024T12:00"
}
```


Barber:

1. /barber sehifesine yonelt
2. burada mushterilerin schedule-u gorsenecek
3. gelen sorgulari accept ve ya reject edecek


NOTES:

Xidmet, Barber, Barbershopu elave ederken id yarat

id uchun `window.crypto.randomUUID()` funksiyasindan istifade et
