package com.example.simpletouristapp.ui.domestic;

import android.app.SearchManager;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.SearchView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.adapter.TypePlaceAdapter;
import com.example.simpletouristapp.databinding.DomesticFragmentBinding;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.service.ToursApiService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DomesticFragment extends Fragment {

    private DomesticFragmentBinding binding;
    private RecyclerView rvDomesticTour;
    private ToursApiService toursApiService;
    private static TourAdapter tourAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
//        DomesticViewModel domesticViewModel =
//                new ViewModelProvider(this).get(DomesticViewModel.class);

        binding = DomesticFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

//        final TextView textView = binding.textDomestic;
//        domesticViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        rvDomesticTour = binding.rvItemDomesticTours;

        toursApiService = new ToursApiService();



        Call<ToursResponse> call = toursApiService.getDomesticToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG",response.code()+"");
                ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                tourAdapter = new TourAdapter(getContext(),tourResponse.getData());
                tourAdapter.initData();
                rvDomesticTour.setLayoutManager(new GridLayoutManager(getContext(),2));
                rvDomesticTour.setAdapter(tourAdapter);
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
//


//        TourAdapter tourAdapter = new TourAdapter(getContext(),tours);
//        rvTour.setLayoutManager(new GridLayoutManager(getContext(),2));
//        rvTour.setAdapter(tourAdapter);

    }
    public static void doFilter(String query){
        tourAdapter.getFilter().filter(query);
        tourAdapter.notifyDataSetChanged();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}