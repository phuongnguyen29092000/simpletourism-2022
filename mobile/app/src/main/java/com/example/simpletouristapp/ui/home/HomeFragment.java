package com.example.simpletouristapp.ui.home;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.adapter.NewsAdapter;
import com.example.simpletouristapp.adapter.PopularPlaceAdapter;
import com.example.simpletouristapp.adapter.TourAdapter;
import com.example.simpletouristapp.databinding.FragmentHomeBinding;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.model.NewsResponse;
import com.example.simpletouristapp.model.PopularPlaces;
import com.example.simpletouristapp.model.ToursResponse;
import com.example.simpletouristapp.service.NewsApiService;
import com.example.simpletouristapp.service.ToursApiService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;
    private RecyclerView rvOutStandingTours;
    private RecyclerView rvHotNews;
    private TourAdapter tourAdapter;
    private ToursApiService toursApiService;
    private NewsApiService newsApiService;
    private List<News> listHotNews;
    private NewsAdapter newsAdapter;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();
        rvHotNews = binding.rvHotNews;
        toursApiService = new ToursApiService();

        rvOutStandingTours =binding.rvItemOutstandingTours;

        listHotNews = new ArrayList<>();
        listHotNews.clear();
        Call<ToursResponse> call = toursApiService.getOutStandingTours();
        call.enqueue(new Callback<ToursResponse>() {
            @Override
            public void onResponse(Call<ToursResponse> call, Response<ToursResponse> response) {
                if(response.code() == 200){
                    ToursResponse tourResponse = response.body();
//                Integer totalResult = tourResponse.totalResult;
                    tourAdapter = new TourAdapter(getContext(),tourResponse.getData(),"out_standing_tour");
                    tourAdapter.initData();
                    rvOutStandingTours.setLayoutManager(new LinearLayoutManager(getContext(),LinearLayoutManager.HORIZONTAL,false));
                    rvOutStandingTours.setAdapter(tourAdapter);
                }else {
                    Toast.makeText(getActivity(), "Some thing went wrong", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ToursResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });

        newsApiService = new NewsApiService();
        Call<NewsResponse> call1 = newsApiService.getAllNews();
        call1.enqueue(new Callback<NewsResponse>() {
            @Override
            public void onResponse(Call<NewsResponse> call, Response<NewsResponse> response) {
                if(response.code() == 200){
                    NewsResponse newsResponse = response.body();
                    List<News> news = newsResponse.getNews();
                    Collections.sort(news, new Comparator<News>() {
                        @Override
                        public int compare(News news, News t1) {
                            if(news.getViewer() < t1.getViewer()){
                                return 1;
                            }else {
                                if(news.getViewer() == t1.getViewer()){
                                    return 0;
                                }else {
                                    return -1;
                                }
                            }
                        }
                    });
                    Log.d("xxx", news.get(0).getTitle());
                    for (int i = 0; i < 6 ; i++){
                        listHotNews.add(news.get(i));
                    }
                    newsAdapter = new NewsAdapter(getContext(),listHotNews,"home");
                    rvHotNews.setLayoutManager(new LinearLayoutManager(getContext(),LinearLayoutManager.HORIZONTAL,false));
                    rvHotNews.setAdapter(newsAdapter);
                }
            }

            @Override
            public void onFailure(Call<NewsResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
        return root;
    }


    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}