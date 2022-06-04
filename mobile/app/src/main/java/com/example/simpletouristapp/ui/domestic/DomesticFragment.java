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
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.adapter.TypePlaceAdapter;
import com.example.simpletouristapp.databinding.DomesticFragmentBinding;
import com.example.simpletouristapp.model.Tour;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.model.TypePlace;
import com.example.simpletouristapp.repository.TourRepository;
import com.example.simpletouristapp.service.ToursApiService;
import com.example.simpletouristapp.ui.international.InternationalViewModel;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DomesticFragment extends Fragment {

    private DomesticFragmentBinding binding;
    private RecyclerView rvDomesticTour;
    private ToursApiService toursApiService;
    private DomesticViewModel domesticViewModel;
    private TourRepository tourRepository;
    private List<Tour> tours;
    private TourAdapter tourAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        domesticViewModel =
                new ViewModelProvider(this).get(DomesticViewModel.class);

        binding = DomesticFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        rvDomesticTour = binding.rvItemDomesticTours;

        tours = new ArrayList<>();
        tourRepository = new TourRepository(getActivity().getApplication());
        tourAdapter = new TourAdapter(getContext(),tours,"domestic");
        rvDomesticTour.setLayoutManager(new GridLayoutManager(getContext(),2));
        domesticViewModel.getDomesticTours().observe(getViewLifecycleOwner(), new Observer<List<Tour>>() {
            @Override
            public void onChanged(List<Tour> tourList) {
                tourAdapter.getTours(tourList);
                rvDomesticTour.setAdapter(tourAdapter);
            }
        });
        getDomesticTours();

        return root;
    }
    public void getDomesticTours(){
        toursApiService = new ToursApiService();



        Call<ToursResponse> call = toursApiService.getDomesticToursApi();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                Log.d("TAG",response.code()+"");
                ToursResponse tourResponse = response.body();
//                tourAdapter = new TourAdapter(getContext(),tourResponse.getData(),"domestic");
//                tourAdapter.initData();
//                rvDomesticTour.setLayoutManager(new GridLayoutManager(getContext(),2));
//                rvDomesticTour.setAdapter(tourAdapter);
                tourRepository.deleteDomesticTour();
                tourRepository.insert(tourResponse.getData());
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getContext(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
    }
    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}