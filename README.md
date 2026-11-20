# Android basic app scaffold

Bu klasör basit bir Android uygulaması iskeleti içerir. Android Studio ile açıp emülatörde veya bağlı bir cihazda çalıştırabilirsiniz.

## Web sürümü ve GitHub Pages yayını

Türkçe, giriş gerektirmeyen web sürümü `web/` klasöründedir. Fakülte, kat rehberi, acil durum, bölümler ve ulaşım bölümlerindeki etkileşimler tarayıcıda çalışır; bir backend veya kullanıcı hesabı kullanılmaz.

Kat rehberindeki birim/kat adları ve fakülte bilgileri Marmara Üniversitesi'nin resmî sayfalarına dayanır. Ancak yayımlanmış doğrulanmış iç kat planı ve acil çıkış koordinatları bulunmadığından, sayfa sahte bir plan veya tahliye rotası göstermez. Kat seçimindeki bilgiler tam bina envanteri değil, resmî kampüs haritasında listelenen noktalardır. Gerçek tahliye için binadaki levhaları ve görevlilerin yönlendirmelerini izleyin.

Bilgi kaynakları:

- [Sağlık Bilimleri Fakültesi](https://sbf.marmara.edu.tr/)
- [Fakülte kampüs haritası](https://sbf.marmara.edu.tr/kampus-haritasi)
- [Fakülte iletişim ve ulaşım](https://sbf.marmara.edu.tr/iletisim/iletisim-ve-ulasim)
- [Üniversite güvenlik ve acil durum bilgileri](https://www.marmara.edu.tr/kampuste-yasam/yasam/guvenlik/)
- [Yerleşke tahliye ve müdahale planları](https://aadk.marmara.edu.tr/yerleske-tahliye-ve-mudahale-planlari)
- [Acil durum toplanma alanları](https://aadk.marmara.edu.tr/acil-durum-toplanma-alanlari)

Resmî Marmara logosu ve fakülte binası fotoğrafı, Marmara Üniversitesi'nin sitesinden yüklenir. Arayüz bağımsız bir bilgilendirme projesidir; üniversitenin resmî web sitesi veya tahliye dokümanı değildir.

Canlı site: https://alperenozalp.github.io/ISG_PROJE/

Bu depoda GitHub Pages ve `main` dalından otomatik yayınlama ayarlıdır. `web/` dosyalarındaki değişiklikleri `main` dalına gönderdiğinizde Actions yeni sürümü yayınlar.

Başka bir depoda yayınlamak için:

1. `android-basic-app` klasörünü GitHub deposuna gönderin.
2. Depoda **Settings → Pages → Build and deployment → Source** bölümünden **GitHub Actions** seçin.
3. `main` dalına gönderim yapın veya **Actions → Deploy web app to GitHub Pages → Run workflow** adımını çalıştırın.
4. Yayın tamamlanınca adres `https://<kullanıcı>.github.io/<depo>/` biçiminde olur.

Hızlı başlatma (Windows):

1. Android Studio'yu açın.
2. `File -> Open` ile bu klasörü açın (`android-basic-app`).
3. Gradle senkronizasyonunu bekleyin.
4. `Run` düğmesi ile emülatörü veya bağlı cihazı seçip uygulamayı başlatın.

Komut satırından APK yüklemek ve PC'de görmek (cihaz bağlıysa):

```bash
adb devices
# Android Studio ile Build -> Build Bundle(s) / APK(s) -> Build APK(s) yapıp çıkan APK yolunu alın
adb install path/to/app-release.apk
```

Ekran yansıtma için (cihaz bağlı, `scrcpy` kuruluysa):

```bash
scrcpy
```

Gradle JDK uyumsuzluğu (hata: "Incompatible Gradle JVM version")

Eğer Android Studio `Gradle JDK` uyumsuzluğu gösteriyorsa (ör. seçili JDK çok yeni/sürüm 25 gibi), şu adımları izleyin:

- Android Studio: `File → Settings → Build, Execution, Deployment → Build Tools → Gradle` bölümüne gidin.
- `Gradle JDK` açılırından `Embedded JDK (17)` veya yüklü bir JDK 11/17/19 seçin.
- Eğer uygun JDK listede yoksa `Download JDK` veya `Add JDK` ile JDK 17 yükleyin veya kurulu JDK yolunu gösterin (ör. `C:/Program Files/Java/jdk-17.x`).

Alternatif (proje seviyesinde JDK sabitleme): proje kökünde `gradle.properties` içinde `org.gradle.java.home` ile JDK yolunu belirtebilirsiniz. Örnek:

```
org.gradle.java.home=C:/Program Files/Java/jdk-17.0.8
```

Windows üzerinde JDK yüklemek için (winget yüklüyse):

```powershell
winget install -e --id Eclipse.Adoptium.JDK.17
java -version
```

Sonrasında Android Studio'yu yeniden başlatın ve `File → Sync Project with Gradle Files` yapın.

