package com.example.simpletouristapp.ui.news;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.simpletouristapp.databinding.DetailNewsBinding;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.model.NewsSingleResponse;
import com.example.simpletouristapp.service.NewsApiService;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.text.SimpleDateFormat;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class DetailNewsFragment extends Fragment {
    private DetailNewsBinding binding;
    private NewsApiService newsApiService;
    private String idNews;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            idNews = (String) getArguments().getSerializable("IdNews");
        }
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = DetailNewsBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        newsApiService = new NewsApiService();

        Call<NewsSingleResponse> call = newsApiService.getNewsById(idNews);
        call.enqueue(new Callback<NewsSingleResponse>() {
            @Override
            public void onResponse(Call<NewsSingleResponse> call, Response<NewsSingleResponse> response) {
                if (response.code() == 200) {
                    NewsSingleResponse newsSingleResponse = response.body();
                    News news = newsSingleResponse.getNews();
                    String pattern = "dd/MM/yyyy";
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
                    binding.title.setText(news.getTitle());
                    binding.description.setText(news.getDescription());
                    Picasso.get().load(ToursApiService.BASE_URL + news.getImageUrl().substring(7)).into(binding.image);
                    binding.view.setText(Integer.toString(news.getViewer()));
                    binding.date.setText(simpleDateFormat.format(news.getDateSubmitted()));
                    binding.tvCompanyName.setText(news.getOwner().getCompanyName());
                }
            }

            @Override
            public void onFailure(Call<NewsSingleResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG", t.getMessage());
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
