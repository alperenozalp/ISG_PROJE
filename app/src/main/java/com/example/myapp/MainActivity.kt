package com.example.myapp

import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.GravityCompat
import androidx.appcompat.widget.Toolbar
import androidx.navigation.fragment.NavHostFragment
import androidx.drawerlayout.widget.DrawerLayout

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Setup NavController from NavHostFragment
        val navHost = supportFragmentManager.findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHost.navController

        // Toolbar + Drawer
        val drawer = findViewById<DrawerLayout>(R.id.drawer_layout)
        val toolbar = findViewById<Toolbar>(R.id.toolbar)
        setSupportActionBar(toolbar)
        // Use a simple menu icon and toggle the end drawer on click
        toolbar.setNavigationIcon(android.R.drawable.ic_menu_sort_by_size)
        toolbar.setNavigationOnClickListener {
            if (drawer.isDrawerOpen(GravityCompat.END)) drawer.closeDrawer(GravityCompat.END) else drawer.openDrawer(GravityCompat.END)
        }

        val btnHome = findViewById<Button>(R.id.btnHome)
        val btnProfile = findViewById<Button>(R.id.btnProfile)
        val btnSettings = findViewById<Button>(R.id.btnSettings)
        val btnPage1 = findViewById<Button>(R.id.btnPage1)
        val btnPage2 = findViewById<Button>(R.id.btnPage2)
        val btnPage3 = findViewById<Button>(R.id.btnPage3)

        btnHome.setOnClickListener { navController.navigate(R.id.homeFragment); drawer.closeDrawer(GravityCompat.END) }
        btnPage1.setOnClickListener { navController.navigate(R.id.page1Fragment); drawer.closeDrawer(GravityCompat.END) }
        btnPage2.setOnClickListener { navController.navigate(R.id.page2Fragment); drawer.closeDrawer(GravityCompat.END) }
        btnPage3.setOnClickListener { navController.navigate(R.id.page3Fragment); drawer.closeDrawer(GravityCompat.END) }
        // Profile and settings could navigate to other fragments or show dialogs
        btnProfile.setOnClickListener { /* TODO: open profile */ drawer.closeDrawer(GravityCompat.END) }
        btnSettings.setOnClickListener { /* TODO: open settings */ drawer.closeDrawer(GravityCompat.END) }
    }
}
