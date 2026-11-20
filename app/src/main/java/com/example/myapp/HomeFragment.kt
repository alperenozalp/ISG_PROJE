package com.example.myapp

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController

class HomeFragment : Fragment() {
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)
        val btnCenter = view.findViewById<Button>(R.id.btnCenter)
        btnCenter.setOnClickListener {
            // navigate to grid fragment
            findNavController().navigate(R.id.gridFragment)
        }
        return view
    }
}
