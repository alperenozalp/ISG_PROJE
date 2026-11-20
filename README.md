# Android basic app scaffold

Bu klasör basit bir Android uygulaması iskeleti içerir. Android Studio ile açıp emülatörde veya bağlı bir cihazda çalıştırabilirsiniz.

## Web sürümü ve GitHub Pages yayını

Uygulamanın tarayıcıda çalışan sürümü `web/` klasöründedir. GitHub Pages iş akışı, `main` dalına web dosyaları gönderildiğinde bu klasörü otomatik olarak yayınlar.

Yayınlamak için:

1. `android-basic-app` klasörünü GitHub'da bir depoya gönderin. Depo adı ve sahibi web adresinin bir parçası olur.
2. Depoda **Settings → Pages → Build and deployment → Source** bölümünden **GitHub Actions** seçin.
3. `main` dalına gönderim yapın veya **Actions → Deploy web app to GitHub Pages → Run workflow** adımını çalıştırın.
4. Yayın tamamlanınca **Settings → Pages** bölümünde görünen bağlantıyı açın. Proje deposu bağlantısı genellikle `https://<kullanıcı>.github.io/<depo>/` biçimindedir.

Bu çalışma alanında GitHub deposu bağlantısı bulunmadığından yayın adımı henüz çalıştırılmamıştır. Depoya gönderildikten sonra Actions iş akışı internetten erişilebilir sayfayı oluşturur.

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

